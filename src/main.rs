use std::fmt::format;
use std::thread::{sleep, spawn};

use headless_chrome::{Browser, LaunchOptions, Tab};
use headless_chrome::protocol::cdp::Page;

mod display;
mod image;
mod web;

use clap::Parser;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Address to load. If this is set, no server will be started.
    #[arg(short, long)]
    address: Option<String>,

    /// Todoist token
    #[arg(short, long)]
    todoist_token: String,
}


fn main() -> anyhow::Result<()> {

    let args: Args = Args::parse();

    let mut address = "http://localhost:3000";
    if let Some(addr) = &args.address {
        address = addr;
    } else {
        spawn(|| {
            web::serve().expect("Failed to start web server");
        });
        sleep(std::time::Duration::from_secs(1));
    }

    let browser = Browser::new(LaunchOptions {
        window_size: Some((480, 800)),
        headless: true,
        ..LaunchOptions::default()
    })?;

    let tab = browser.new_tab()?;

    /// Navigate to wikipedia
    tab.navigate_to(&format!("{}?token={}", address, args.todoist_token))?;

    // /// We should end up on the WebKit-page once navigated
    // let elem = tab.wait_for_element(".plasmic_page_wrapper")?;

    sleep(std::time::Duration::from_secs(2));

    /// Take a screenshot of the entire browser window
    let png = tab.capture_screenshot(
        Page::CaptureScreenshotFormatOption::Png,
        None,
        None,
        true)?;


    let img = image::dither(png)?;


    display::display(img)?;

    let mut version = get_version(&tab).unwrap_or(0u64);
    loop {
        sleep(std::time::Duration::from_secs(1));
        let w_version = tab.evaluate("window.version", false)?;
        let current_version = w_version.value.map(|v| v.as_u64()).flatten().unwrap_or(0u64);

        if current_version > version {
            version = current_version;
            let png = tab.capture_screenshot(
                Page::CaptureScreenshotFormatOption::Png,
                None,
                None,
                true)?;
            let img = image::dither(png)?;
            display::display(img)?;
        }
    }

    //display::display()
    Ok(())
}

fn get_version(tab: &Tab) -> anyhow::Result<u64> {
    let w_version = tab.evaluate("window.version", false)?;
    let current_version = w_version.value.map(|v| v.as_u64()).flatten().unwrap_or(0u64);
    Ok(current_version)
}
