use axum::{
    Form, Router,
    extract::State,
    response::Html,
    routing::{get, post},
};
use serde::Deserialize;
use sqlx::PgPool;
use std::{fs, net::SocketAddr};
use tokio::net::TcpListener;

#[derive(Clone)]
struct AppState {
    db: PgPool,
}

#[tokio::main]
async fn main() {
    // DB connection
    let db = PgPool::connect("postgres://***:***@localhost/***")
        .await
        .expect("Failed to connect to database");

    let state = AppState { db };

    let app = Router::new()
        .route("/", get(root))
        .route("/submit", post(handle_post))
        .with_state(state);

    let addr: SocketAddr = "127.0.0.1:3000".parse().unwrap();
    let listener = TcpListener::bind(addr).await.unwrap();

    println!("Server running at http://{}", addr);

    axum::serve(listener, app).await.unwrap();
}

// Serve the form
async fn root() -> Html<String> {
    let html = fs::read_to_string("templates/index.html").expect("Failed to read index.html");
    Html(html)
}

#[derive(Deserialize, Debug)]
struct InputData {
    name: String,
    age: i32,
}

async fn handle_post(State(state): State<AppState>, Form(data): Form<InputData>) -> Html<String> {
    // Insert into database
    let result: Result<sqlx::postgres::PgQueryResult, sqlx::Error> =
        sqlx::query(r#"INSERT INTO submissions (name, age) VALUES ($1, $2)"#)
            .bind(&data.name)
            .bind(data.age)
            .execute(&state.db)
            .await;

    match result {
        Ok(_) => Html("<h1>Submission saved successfully!</h1>".to_string()),
        Err(e) => Html(format!("<h1>Error saving submission: {}</h1>", e)),
    }
}
