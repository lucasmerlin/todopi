use axum::body;
use axum::body::{Empty, Full};
use axum::extract::Path;
use axum::http::{header, HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use include_dir::{Dir, include_dir};
use tokio::runtime;

static STATIC_DIR: Dir<'_> = include_dir!("./web/build");


pub fn serve() -> anyhow::Result<()> {

    let rt = runtime::Builder::new_current_thread().enable_io().build()?;

    rt.block_on(async {
        let app = axum::Router::new()
            .route("/", get(static_path))
            .route("/*path", get(static_path));

        let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 3000));

        axum::Server::bind(&addr)
            .serve(app.into_make_service())
            .await?;

        Ok(())
    })
}

async fn static_path(path: Option<Path<String>>) -> impl IntoResponse {
    let path = path.map(|p| p.0).unwrap_or_else(|| "index.html".to_string());
    let path = path.trim_start_matches('/');
    println!("path: {}", path);
    let mime_type = mime_guess::from_path(path).first_or_text_plain();

    match STATIC_DIR.get_file(path).or(STATIC_DIR.get_file("index.html")) {
        None => Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(body::boxed(Empty::new()))
            .unwrap(),
        Some(file) => Response::builder()
            .status(StatusCode::OK)
            .header(
                header::CONTENT_TYPE,
                HeaderValue::from_str(mime_type.as_ref()).unwrap(),
            )
            .body(body::boxed(Full::from(file.contents())))
            .unwrap(),
    }
}
