use axum::{
    extract::{Path, Form},
    response::{Html, Redirect},
    routing::{get, post},
    Router,
};
use serde::Deserialize;
use std::{
    fs::{self, OpenOptions, File},
    io::{self, BufRead, Write},
    net::SocketAddr,
};

#[derive(Deserialize)]
struct NoteForm {
    text: String,
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(show_home))        // Home page
        .route("/add", post(add_note))     // Add note
        .route("/delete/{id}", get(delete_note)); // Delete note

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Server running at http://{}", addr);

    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}

// Render the index.html with injected notes
async fn show_home() -> Html<String> {
    let notes = read_notes();

    // Load template from file
    let template = fs::read_to_string("templates/index.html")
        .expect("Failed to read template");

    // Build notes HTML
    let mut notes_html = String::new();
    for (i, note) in notes.iter().enumerate() {
        notes_html.push_str(&format!(
            "<li>{}: {} <a href=\"/delete/{}\">[Delete]</a></li>",
            i + 1,
            note,
            i
        ));
    }

    // Replace {{notes}} in template
    let content = template.replace("{{notes}}", &notes_html);
    Html(content)
}

// Add a new note
async fn add_note(Form(note): Form<NoteForm>) -> Redirect {
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("notes.txt")
        .unwrap();

    writeln!(file, "{}", note.text).unwrap();
    Redirect::to("/")
}

// Delete a note
async fn delete_note(Path(id): Path<usize>) -> Redirect {
    let notes = read_notes();
    let new_notes: Vec<String> = notes
        .into_iter()
        .enumerate()
        .filter_map(|(i, note)| if i == id { None } else { Some(note) })
        .collect();

    let mut file = File::create("notes.txt").unwrap();
    for note in new_notes {
        writeln!(file, "{}", note).unwrap();
    }

    Redirect::to("/")
}

// Utility: read notes from file
fn read_notes() -> Vec<String> {
    let file = File::open("notes.txt");
    let mut notes = Vec::new();

    if let Ok(f) = file {
        let reader = io::BufReader::new(f);
        for line in reader.lines() {
            if let Ok(note) = line {
                notes.push(note);
            }
        }
    }
    notes
}
