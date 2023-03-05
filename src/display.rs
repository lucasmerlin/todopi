use std::thread::sleep;
use embedded_graphics::prelude::*;
use embedded_graphics::primitives::*;
use embedded_hal::prelude::*;
use epd_waveshare::color::TriColor::{Black, Chromatic};
use epd_waveshare::epd7in5b_v2::{Display7in5, Epd7in5};
use epd_waveshare::prelude::*;
use epd_waveshare::prelude::WaveshareDisplay;
use rppal::gpio::Gpio;
use rppal::hal::Delay;
use rppal::spi;
use rppal::spi::{SlaveSelect, Spi};
use rppal::spi::Bus::Spi0;

pub fn display(img: Vec<u8>) -> anyhow::Result<()> {

    let gpio = Gpio::new()?;

    // Configure Digital I/O Pin to be used as Chip Select for SPI
    let mut cs = gpio.get(8)?.into_output(); //BCM7 CE0
    cs.set_high();

    let busy = gpio.get(24)?.into_input(); //pin 29

    let mut dc = gpio.get(25)?.into_output(); //pin 31 //bcm6
    dc.set_high();

    let mut rst = gpio.get(17)?.into_output(); //pin 36 //bcm16
    rst.set_high();

    let mut delay = Delay {};

    let mut spi = Spi::new(Spi0, SlaveSelect::Ss0, 4_000_000, spi::Mode::Mode0)?;

    // Setup EPD
    let mut epd = Epd7in5::new(&mut spi, cs, busy, dc, rst, &mut delay, Some(200_000))?;

    println!("EPD initialized");

    //
    // epd.wait_until_idle(&mut spi, &mut delay)?;
    // println!("Clearing display");
    // epd.clear_frame(&mut spi, &mut delay)?;



    epd.wait_until_idle(&mut spi, &mut delay)?;
    // Display updated frame
    println!("Updating frame");
    epd.update_frame(&mut spi, img.as_slice(), &mut delay)?;

    epd.wait_until_idle(&mut spi, &mut delay)?;

    println!("Frame updated");

    epd.display_frame(&mut spi, &mut delay)?;
    epd.wait_until_idle(&mut spi, &mut delay)?;
    epd.sleep(&mut spi, &mut delay)?;

    println!("Done");

    Ok(())
}
