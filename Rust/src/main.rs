extern crate dotenv;
use dotenv::dotenv;
use std::env;

use serenity::client::Client;
use serenity::model::channel::Message;
use serenity::prelude::{EventHandler, Context};
use serenity::framework::standard::{
    StandardFramework,
    CommandResult,
    macros::{
        command,
        group
    }
};

#[group]
#[commands(ping)]
struct General;

struct Handler;

impl EventHandler for Handler {}

fn main() {
    dotenv().ok();

    let mut client = Client::new(&env::var("DISCORD_TOKEN").expect("token"), Handler)
                   .expect("Error creating client");
    client.with_framework(StandardFramework::new()
          .configure(|c| c.prefix(&env::var("PREFIX").expect("prefix")))
          .group(&GENERAL_GROUP));

    if let Err(why) = client.start() {
        println!("An error occurred while running the client: {:?}", why);
    }
}

#[command]
fn ping(ctx: &mut Context, msg: &Message) -> CommandResult {
    msg.reply(ctx, "Pong!")?;
    Ok(())
}