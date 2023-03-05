use image::{
    imageops::{self, FilterType},
    GenericImage, GenericImageView,
};

pub fn fit_image<I, J>(target: &mut I, source: &J)
where
    I: 'static + GenericImage,
    J: GenericImageView<Pixel = I::Pixel>,
{
    if source.width() <= target.width() && source.height() <= target.height() {
        let image = source;

        let x = (target.width() - image.width()) / 2;
        let y = (target.height() - image.height()) / 2;

        imageops::replace(target, image, x, y);
    } else {
        let scale = f64::min(
            target.width() as f64 / source.width() as f64,
            target.height() as f64 / source.height() as f64,
        );
        let width = (source.width() as f64 * scale) as u32;
        let height = (source.height() as f64 * scale) as u32;

        let image = imageops::resize(source, width, height, FilterType::Lanczos3);

        let x = (target.width() - image.width()) / 2;
        let y = (target.height() - image.height()) / 2;

        imageops::replace(target, &image, x, y);
    }
}
