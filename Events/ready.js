module.exports = async (client) => {
        console.log('봇 켜짐')
        setInterval(() =>{
            client.user.setActivity('$help | 천마 [Vendetta]#4120')
        },8000)
}
