// Import modules from Rust's standard library that we'll use in the program.
use std::fs::{OpenOptions, read_to_string}; // For reading & writing files.
use std::io::{self, Write}; // For handling user input/output.

// The main function — execution starts here.
fn main() {
    // Infinite loop to keep showing the menu until the user chooses to exit.
    loop {
        // Print menu options to the terminal.
        println!("\n=== To-Do List App ===");
        println!("1. View tasks"); // Option to read tasks from file
        println!("2. Add task");   // Option to append a new task to file
        println!("3. Exit");       // Option to stop the program
        print!("Choose an option: "); // No newline here so user can type right after

        // We flush stdout manually because `print!` buffers text until a newline.
        // Without this, the text may not appear before we ask for input.
        io::stdout().flush().unwrap();

        // Create a mutable String to store the user's choice.
        let mut choice = String::new();

        // Read user input (including newline) into the 'choice' string.
        io::stdin().read_line(&mut choice).unwrap();

        // Trim spaces/newlines and decide what to do using match.
        match choice.trim() {
            "1" => view_tasks(), // Call the function that displays tasks
            "2" => add_task(),   // Call the function that adds a new task
            "3" => {
                println!("Goodbye!"); // Message before exiting
                break; // Break out of the loop → end program
            }
            _ => println!("Invalid choice!"), // Anything else = invalid input
        }
    }
}

// Function to display all tasks from the file.
fn view_tasks() {
    // Try reading the file "tasks.txt".
    // If it doesn't exist or fails, return an empty String instead (no panic).
    let tasks = read_to_string("tasks.txt").unwrap_or_else(|_| String::new());

    // Check if there are any tasks.
    if tasks.trim().is_empty() {
        println!("No tasks found!"); // No content in file
    } else {
        println!("\nYour tasks:");
        // Iterate through each line in the file.
        // `enumerate()` gives (index, value) so we can number tasks.
        for (i, task) in tasks.lines().enumerate() {
            println!("{}. {}", i + 1, task); // Show index+1 and task text
        }
    }
}

// Function to add a new task to the file.
fn add_task() {
    print!("Enter new task: "); // Ask user for the task text
    io::stdout().flush().unwrap(); // Show the prompt immediately

    let mut task = String::new();
    io::stdin().read_line(&mut task).unwrap(); // Read user input into task

    // Open "tasks.txt" with the following modes:
    // - append(true): add to the end instead of overwriting
    // - create(true): create the file if it doesn't exist
    let mut file = OpenOptions::new()
        .append(true)
        .create(true)
        .open("tasks.txt")
        .unwrap();

    // Write the task to the file, trimming extra whitespace/newline first.
    writeln!(file, "{}", task.trim()).unwrap();

    println!("Task added!"); // Confirmation message
}
