const Discord = require("discord.js");
const Client = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Http = new XMLHttpRequest();
var bytes = require("bytes");
const fetch = require("node-fetch");

const config = require("./config.json");

let prefix = "-";

Client.on("ready", () => {
  console.log("Bot has successfully started !");
});

Client.on("ready", () => {
  Client.user.setStatus("available");
  Client.user.setPresence({
    game: {
      name: "with proxies!",
      type: "Playing"
    }
  });
});

Client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  const command = args.shift().toLowerCase();

  if (command === "proxy") {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`
      );
    }

    const url =
      "https://astroproxy.com/api/v1/countries?token=48fb0df1e822b478";

    fetch(`https://astroproxy.com/api/v1/ports/${args}?token=48fb0df1e822b478`)
      .then(function(response) {
        return response.json();
      })
      .then(datas => {
        console.log(datas.data);

        var data_left = datas.data.traffic.left;
        var data_total = datas.data.traffic.total;
        var data_used = datas.data.traffic.used;

        var data_type1 = bytes(data_left);
        var data_type2 = bytes(data_total);
        var data_type3 = bytes(data_used);

        let hex = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
        let embed = new Discord.MessageEmbed()
          .setTitle("**__Proxy Info!__**")
          .addField("`Name:`", `${datas.data.name}`, false)
          .addField("`IP:`", `${datas.data.node.ip}`, false)
          .addField(
            "`Ports:`",
            `Http - ${datas.data.ports.http} / Socks5 - ${datas.data.ports.socks}`,
            false
          )
          .addField(
            "`Country:`",
            `${datas.data.country ? datas.data.country : "None"}`,
            false
          )
          .addField("`Data Total:`", `${data_type2}`, true)
          .addField("`Data Used:`", `${data_type3}`, true)
          .addField("`Data Left:`", `${data_type1}`, true)
          .addField("`Network:`", `${datas.data.network}`, false)
          .setThumbnail(message.author.avatarURL)
          .setColor(hex)
          .setTimestamp()
          .setFooter(`Created by: RioDaGod`);
        message.author.send(embed);

        let embed2 = new Discord.MessageEmbed()
          .setTitle("**__Proxy sent in DMs!__**")
          .setColor("GREEN")
          .setTimestamp()
          .setFooter(`Created by: RioDaGod`);
        message.channel.send(embed2);
      })
      .catch(function() {
        let embed3 = new Discord.MessageEmbed()
          .setTitle("**__Wrong ID Provided!__**")
          .setColor("RED")
          .setTimestamp()
          .setFooter(`Created by: RioDaGod`);
        return message.channel.send(embed3);
      });
  }
  if (command === "resetip") {
      if (!args.length) {
        return message.channel.send(
          `You didn't provide any arguments, ${message.author}!`
        );
      }

      fetch(`https://astroproxy.com/api/v1/ports/${args}?token=48fb0df1e822b478`)
      .then(function(response) {
        return response.json();
      })
      .then(datas => {
        console.log(datas.data);
        var id = datas.data.id
        var port = datas.data.ports.http

     fetch(`http://${datas.data.node.ip}:${port}/api/changeIP?apiToken=48fb0df1e822b478`)
      .then(function(response) {
        return response.json();
      })
      .then(datas => {
       console.log(datas)
       message.channel.send("IP Reset Complete !")
      let embed11 = new Discord.MessageEmbed()
          .setTitle("**__Successfully changed IP!__**")
          .setColor("GREEN")
          .addField("`New IP:`", `${datas.IP ? datas.IP : "You need to wait " + datas.left + " seconds before changing again!"}`, false)
          .setTimestamp()
          .setFooter(`Created by: RioDaGod`);
        return message.author.send(embed11);
          })
         })
      .catch(function() {
        let embed10 = new Discord.MessageEmbed()
          .setTitle("**__Wrong ID Provided!__**")
          .setColor("RED")
          .setTimestamp()
          .setFooter(`Created by: RioDaGod`);
        return message.channel.send(embed10);
      });
     
    
  }
});

Client.on("error", e => console.error(e));
Client.on("warn", e => console.warn(e));
Client.on("debug", e => console.info(e));

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://gen-bot-for-edi.glitch.me`);
}, 280000);

Client.login(config.token);

let count = 0;

setInterval(

  () =>

    require("node-fetch")(process.env.URL).then(() =>

      console.log(`[${++count}] here i pinged ${process.env.URL}`)

    ),

  300000

);

