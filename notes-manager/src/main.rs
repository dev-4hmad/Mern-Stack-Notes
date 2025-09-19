use std::fs::{File, OpenOptions};
use std::io::{self, BufRead, Write};
use std::env;

fn main() {
    // CLI arguments: e.g. "notes add" ya "notes list"
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        eprintln!("Usage: notes <add|list>");
        return;
    }

    match args[1].as_str() {
        "add" => add_note(),
        "list" => list_notes(),
        _ => eprintln!("Unknown command: {}. Use 'add' or 'list'.", args[1]),
    }
}

fn add_note() {
    println!("Enter your note:");

    let mut note = String::new();
    io::stdin().read_line(&mut note).expect("Failed to read input");

    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("notes.txt")
        .expect("Failed to open file");

    if let Err(e) = writeln!(file, "{}", note.trim()) {
        eprintln!("Failed to write note: {}", e);
    } else {
        println!("Note added successfully!");
    }
}

fn list_notes() {
    let file = File::open("notes.txt");

    match file {
        Ok(f) => {
            let reader = io::BufReader::new(f);
            println!("Your notes:\n");

            for (index, line) in reader.lines().enumerate() {
                match line {
                    Ok(note) => println!("{}: {}", index + 1, note),
                    Err(e) => eprintln!("Error reading line: {}", e),
                }
            }
        }
        Err(_) => {
            println!("No notes found. Add some first!");
        }
    }
}
