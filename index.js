let level = []
let img = []
let ch = []
let ans = 0
let idx = 0
var myInterval = undefined

$(document).ready(async function () {
    if (localStorage.getItem('level') === null) {
        await load()
        localStorage.setItem('level', JSON.stringify(level))
        localStorage.setItem('img', JSON.stringify(img))
        localStorage.setItem('ch', JSON.stringify(level))
    }
    else {
        level = JSON.parse(localStorage.getItem('level'))
        img = JSON.parse(localStorage.getItem('img'))
        ch = JSON.parse(localStorage.getItem('ch'))
    }
    if (level.length <= 0) {
        $('.main').hide()
        Swal.fire({
            title: 'คุณทำครบทุกระดับแล้ว ขอบคุณครับ',
            showConfirmButton: true,
            confirmButtonText: 'เริ่มเล่นใหม่',
            showDenyButton: true,
            denyButtonText: 'ออกจากเกม',
            allowOutsideClick: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear()
                location.reload()
            }
        })
    } else {
        game()
    }

})

async function load() {
    let response = await fetch('./conan/conan.txt')
    let text = await response.text()
    let lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
        let data = lines[i].split(',')
        level.push(data[0])
        img.push(data[1].trim())
    }
}


function game() {
    let index = Math.floor(Math.random() * level.length)
    let index_ch = Math.floor(Math.random() * 4) + 1
    let level_name = level[index]
    let img_name = img[index]
    ans = index_ch
    idx = index
    $('img').attr('src', './conan/' + img_name)
    $('#choice' + index_ch).text(level_name)
    for (let i = 1; i <= 4; i++) {
        if (i != index_ch) {
            let ch_name = level_name
            while (ch_name == level_name) {
                let index_ch2 = Math.floor(Math.random() * ch.length)
                ch_name = ch[index_ch2]
            }
            $('#choice' + i).text(ch_name)
        }
    }
    myInterval = setInterval(function () {
        let count = $('#timer').text()
        count--
        $('#timer').text(count)
        if (count <= 0) {
            clearInterval(myInterval)
            $('#timer').text('หมดเวลา')
            for (let j = 1; j <= 4; j++) {
                $('#choice' + j).prop('disabled', true);
            }
            findOK()
            setTimeout(() => {
                location.reload()
            }, 5000);
        }

    }, 1000);

}

function findOK() {
    switch (ans) {
        case 1:
            $('#choice1').css('background-color', '#44c767');
            $('#choice1').css('border', '1px solid #18ab29');
            break;
        case 2:
            $('#choice2').css('background-color', '#44c767');
            $('#choice2').css('border', '1px solid #18ab29');
            break;
        case 3:
            $('#choice3').css('background-color', '#44c767');
            $('#choice3').css('border', '1px solid #18ab29');
            break;
        case 4:
            $('#choice4').css('background-color', '#44c767');
            $('#choice4').css('border', '1px solid #18ab29');
            break;

        default:
            break;
    }
}


for (let i = 1; i <= 4; i++) {
    $('#choice' + i).click(function () {
        clearInterval(myInterval)
        if (ans == i) {
            $('#choice' + i).css('background-color', '#44c767');
            $('#choice' + i).css('border', '1px solid #18ab29');
            level.splice(idx, 1)
            img.splice(idx, 1)
            localStorage.setItem('level', JSON.stringify(level))
            localStorage.setItem('img', JSON.stringify(img))
        } else {
            $('#choice' + i).css('background-color', '#c74545');
            $('#choice' + i).css('border', '1px solid #ab1919');
            findOK()
        }
        for (let j = 1; j <= 4; j++) {
            $('#choice' + j).prop('disabled', true);
        }
        setTimeout(() => {
            location.reload()
        }, 5000);
    })
}




