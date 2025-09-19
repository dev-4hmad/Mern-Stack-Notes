use std::fs::OpenOptions;
use std::io::{self, Write};
fn main(){
    println!("Enter your note bro:");

    let mut note = String::new();
    io::stdin().read_line(&mut note).expect("Sorry, weird note");

    let mut file = OpenOptions::new()
    .create(true)
    .append(true)
    .open("notes.md")
    .expect("Failed to open file");

    if let Err(e) = writeln!(file, "{}", note.trim()){
        eprintln!("Failed to write the note: {}", e);
    } else {
        println!("Good boy, You know how to use this code 👍")
    }
}