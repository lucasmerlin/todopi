use std::path::Path;

use dither::{color::palette, prelude::*};
use image::{ImageBuffer, imageops, Rgb, RgbImage};

mod utils;


lazy_static::lazy_static! {
    static ref PALETTE: Vec<RGB<u8>> = palette::parse(include_str!("../../palette.plt")).unwrap();
}

pub fn dither(image: Vec<u8>) -> anyhow::Result<Vec<u8>> {
    let img: RgbImage = {
        let mut target = ImageBuffer::from_pixel(480, 800, Rgb { 0: [255, 255, 255] });
        let image = image::load_from_memory(&image).unwrap().into_rgb8();
        utils::fit_image(&mut target, &image);
        target
    };

    let rotated = imageops::rotate90(&img);

    let img = rotated.pixels().map(|p| RGB::from(p.0));

    let img: Img<RGB<f64>> = Img::<RGB<u8>>::new(img, 800)
        .unwrap()
        .convert_with(|rgb| rgb.convert_with(f64::from));

    let dithered_img = ditherer::ATKINSON
        .dither(img, palette::quantize(&PALETTE))
        .convert_with(|rgb| rgb.convert_with(clamp_f64_to_u8));

    dithered_img.clone().save(Path::new("preview.png")).unwrap();


    let dithered_vec = dithered_img
        .into_vec();

    let img_a = dithered_vec
        .chunks_exact(8)
        .map(|pixels| {
            let mut val = 0;

            for (i, pixel) in pixels.iter().enumerate() {
                let p = if PALETTE.iter().position(|col| pixel == col).unwrap() as u8 == 1 {
                    1
                } else { 0 };
                val = val | (p << 7 - i);
            }

            val
        });


    let img_b = dithered_vec
        .chunks_exact(8)
        .map(|pixels| {
            let mut val = 0;

            for (i, pixel) in pixels.iter().enumerate() {
                let p = if PALETTE.iter().position(|col| pixel == col).unwrap() as u8 == 2 {
                    1
                } else { 0 };
                val = val | (p << 7 - i);
            }

            val
        });

    let data = img_a.chain(img_b).collect::<Vec<_>>();

    Ok(data)
}
