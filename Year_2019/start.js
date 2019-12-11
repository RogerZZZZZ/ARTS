const path = require('path')
const fs = require('fs')

let now = new Date()
let nowDayOfWeek = now.getDay()
let nowDay = now.getDate()
let nowMonth = now.getMonth()
let nowYear = now.getFullYear()

const getWeekStartDate = () => {
    let date = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
    return date.toLocaleDateString()
}

const weekStartDate = '2019-04-28'
console.log(`Start to init this week ARTS. Week start at ${weekStartDate}`)

let folderName = __dirname + `/Week_${weekStartDate}`

fs.mkdir(folderName, (err) => {
    if (err) {
        console.log(`Folder ${folderName} is already exist`)
        return
    }
    console.log('folder create successfully')
    let fileName = '/README.md'
    let content = `# Week ${weekStartDate}\n\n## Algorithm\n\n## Tips\n\n## Share`

    fs.writeFile(folderName + fileName, content, (err) => {
        if (err) {
            console.log(`File ${fileName} create failed.`)
            return
        }
        console.log('file create successfully')

        let appendContent = `\n\n[Week_${weekStartDate}](https://github.com/RogerZZZZZ/ARTS/blob/master/Year_2019/Week_${weekStartDate})`
        fs.appendFile(__dirname + '/README.md', appendContent, (err) => {
            if (err) {
                console.log('Fail to update readme.md')
                return
            }
            console.log('update README successfully')
        })
    })
})
