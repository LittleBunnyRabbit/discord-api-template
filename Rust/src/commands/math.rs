use serenity::prelude::*;
use serenity::model::prelude::*;
use serenity::framework::standard::{
    Args, CommandResult,
    macros::command,
};

#[command]
pub fn multiply(ctx: &mut Context, msg: &Message, mut args: Args) -> CommandResult {
    println!("Multiply command!");
    let one = args.single::<f64>().unwrap();
    let two = args.single::<f64>().unwrap();

    let product = one * two;

    let _ = msg.channel_id.say(&ctx.http, product);

    Ok(())
}


#[command]
pub fn sum(ctx: &mut Context, msg: &Message, mut args: Args) -> CommandResult {
    println!("Multiply command!");
    let one = args.single::<f64>().unwrap();
    let two = args.single::<f64>().unwrap();

    let product: f64 = one + two;

    let _ = msg.channel_id.say(&ctx.http, product);

    Ok(())
}