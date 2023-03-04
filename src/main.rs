use embedded_graphics::prelude::*;
use embedded_graphics::primitives::*;
use embedded_hal::prelude::*;
use epd_waveshare::color::TriColor::Black;
use epd_waveshare::epd7in5b_v2::{Display7in5, Epd7in5};
use epd_waveshare::prelude::*;
use epd_waveshare::prelude::WaveshareDisplay;
use linux_embedded_hal::{Pin, spidev};
use linux_embedded_hal::Spidev;
use linux_embedded_hal::Delay;
use linux_embedded_hal::spidev::SpidevOptions;
use linux_embedded_hal::sysfs_gpio::Direction;

fn main() -> Result<(), std::io::Error> {
    println!("Hello, world! Hmm");

    // Configure Digital I/O Pin to be used as Chip Select for SPI
    let cs = Pin::new(10); //BCM7 CE0
    cs.export().expect("cs export");
    while !cs.is_exported() {}
    cs.set_direction(Direction::Out).expect("CS Direction");
    cs.set_value(1).expect("CS Value set to 1");

    println!("CS: {}", cs.get_value().unwrap());

    let busy = Pin::new(5); //pin 29
    busy.export().expect("busy export");
    while !busy.is_exported() {}
    busy.set_direction(Direction::In).expect("busy Direction");
    //busy.set_value(1).expect("busy Value set to 1");

    println!("BUSY: {}", busy.get_value().unwrap());

    let dc = Pin::new(6); //pin 31 //bcm6
    dc.export().expect("dc export");
    while !dc.is_exported() {}
    dc.set_direction(Direction::Out).expect("dc Direction");
    dc.set_value(1).expect("dc Value set to 1");

    println!("DC: {}", dc.get_value().unwrap());

    let rst = Pin::new(0); //pin 36 //bcm16
    rst.export().expect("rst export");
    while !rst.is_exported() {}
    rst.set_direction(Direction::Out).expect("rst Direction");
    rst.set_value(1).expect("rst Value set to 1");

    println!("RST: {}", rst.get_value().unwrap());

    let mut delay = Delay {};

    let mut spi = Spidev::open("/dev/spidev0.0").expect("spidev directory");
    let options = SpidevOptions::new()
        .bits_per_word(8)
        .max_speed_hz(4_000_000)
        .mode(spidev::SpiModeFlags::SPI_MODE_0)
        .build();
    spi.configure(&options).expect("spi configuration");

    println!("SPI initialized");

    // Setup EPD
    let mut epd = Epd7in5::new(&mut spi, cs, busy, dc, rst, &mut delay, None)?;

    println!("EPD initialized");

// Use display graphics from embedded-graphics
    let mut display = Display7in5::default();

// Use embedded graphics for drawing a line

    let _ = Line::new(Point::new(0, 120), Point::new(0, 295))
        .into_styled(PrimitiveStyle::with_stroke(Black, 1))
        .draw(&mut display);

    println!("Clearing frame");

    epd.clear_frame(&mut spi, &mut delay)?;

    println!("Frame cleared");

    // Display updated frame
    epd.update_frame(&mut spi, &display.buffer(), &mut delay)?;

    println!("Frame updated");

    epd.display_frame(&mut spi, &mut delay)?;

    println!("Frame displayed");

// Set the EPD to sleep
    epd.sleep(&mut spi, &mut delay)?;

    Ok(())
}
