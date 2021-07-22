module.exports = {
    name: "interaction",
    async execute(interaction) {
        // isMessageComponent() 도 있는데 아직 활용법을 찾지 못함.

        // 길드에서 사용하였는가 여부를 판단.
        if (interaction.inGuild()) {
            console.log("Using in Guild");
        } else {
            console.log("It isn't using in Guild");
        }

        // 무슨 상호 작용이 적용되었는지 판단.
        if (interaction.isButton()) {
            console.log("Button click is detected");
        } else if (interaction.isSelectMenu()) {
            console.log("SelectMenu click is detected");
        } else if (interaction.isCommand()) {
            console.log("Command use is detected");
        }
    }
}