var mobs = ['<img ### width=150px src="/assets/mob/mob.gif"/>',
    '<img ### width=150px src="/assets/mob/mob1.gif"/>',
    '<img ### width=150px src="/assets/mob/mob2.gif"/>',
    '<img ### width=120px src="/assets/mob/mob3sized.gif"/>',
    '<img ### width=150px src="/assets/mob/mob4sized.gif"/>']

var player_easy = {
    MAX_AMMOUNT : 20,
    DELAY: 1500,
    MAX_HP : 5,
    current_ammount : 0,
    dificultate: 1,
    multiplier: 1,
    current_hp: 5
}

var player_medium = {
    MAX_AMMOUNT : 15,
    DELAY: 750,
    MAX_HP : 3,
    current_ammount : 0,
    dificultate: 2,
    multiplier: 2,
    current_hp: 3
}

var player_hard = {
    MAX_AMMOUNT : 10,
    DELAY: 400,
    MAX_HP : 1,
    current_ammount : 0,
    dificultate: 3,
    multiplier: 5,
    current_hp: 1
}


var heart = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>`
var MAX_AMMOUNT = 20;
var MAX_HP = 5;
var DELAY = 2000; // ms
var current_ammount = 0;
var current_hp = 5;
var current_score = 0;
var dificultate = 0;
var multiplier = 1;
var canvasumeu = `<canvas id="myBattleground" class="main-panel" width="880" height="780" style="border:4px solid #fae7e7;">
                
</canvas>`

function addHealth(heartNumber) {
    let hb = ""
    for (i = 0; i < MAX_HP; i++) {
        if (i < heartNumber) {
            hb += `<svg class="full-hp" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="30" height="30" x="0" y="0" viewBox="0 0 437.775 437.774" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
            <g xmlns="http://www.w3.org/2000/svg">
                <path d="M316.722,29.761c66.852,0,121.053,54.202,121.053,121.041c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801   C0,67.584,54.202,29.761,121.041,29.761c40.262,0,75.827,19.745,97.841,49.976C240.899,49.506,276.47,29.761,316.722,29.761z" fill="#ffffff" data-original="#000000" style="" class=""/>
            </g></svg>`
        } else {
            hb += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="30" height="30" x="0" y="0" viewBox="0 0 437.775 437.774" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
            <g xmlns="http://www.w3.org/2000/svg">
                <path d="M316.722,29.761c66.852,0,121.053,54.202,121.053,121.041c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801   C0,67.584,54.202,29.761,121.041,29.761c40.262,0,75.827,19.745,97.841,49.976C240.899,49.506,276.47,29.761,316.722,29.761z" fill="#ffffff" data-original="#000000" style="" class=""/>
            </g></svg>`
        }

    }
    $("#hb-val").html(hb)
}

function game() { 
    addHealth(current_hp)       //  create a loop function
    initializeTabelPersonal()
    setTimeout(function () {   //  call a 3s setTimeout when the loop is called
        add_mob(current_ammount)
        current_ammount++;   //  your code here
        set_mobs_count(current_ammount)
        if (current_hp != 0) {           //  if the counter < 10, call the loop function
            if (current_ammount == MAX_AMMOUNT) {
                current_hp--;
                $(".main-panel").html('')
                $(".main-panel").append(canvasumeu)
                current_ammount = 0;
                addHealth(current_hp)
            }
            game();             //  ..  again which will trigger another 
        } else {
            $(".main-panel").html('')
            $(".main-panel").append(canvasumeu)
            gameOver()
        }                       //  ..  setTimeout()
    }, DELAY)
}


function add_mob(current_ammount) {
    let mob_x, mob_y;
    mob_x = Math.floor(Math.random() * (screen.width /2 - 200)) + 1
    mob_y = Math.floor(Math.random() * (screen.width /2.5 - 200)) + 1
    let randomElement = mobs[Math.floor(Math.random() * mobs.length)]; //ajax
    randomElement = randomElement.replace("###", `style="top:${mob_y}px;left:${mob_x}px" onclick="killMob(this);$(this).prop('onclick', null).off('click');"`)
    $(".main-panel").append(randomElement)
    // bindImages()

}


function killMob(element) {
    current_ammount--

    $(element).fadeOut(300, function () { $(this).remove(); }); // jquery
    current_score+=(1* multiplier);
    $("#scor-val").html(current_score)

}

function set_mobs_count(current_ammount) {
    $("#mobs-val").html(current_ammount)
}

sessionStorage.setItem('Highscore', 0);

function gameOver() {
    setScore(current_score)
    getTopScor()
    Swal.fire({
        title: `Game over ${sessionStorage.getItem('nume')}. You lose.`,
        width: 600,
        padding: '3em',
        showDenyButton: true,
        confirmButtonText: 'Joaca din nou?',
        denyButtonText: 'Modifica',
        text: `Ai ucis in total ${current_score} monstrii.`,
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `
    }).then((result) => {
        if (result.isConfirmed) {
            current_player = JSON.parse(sessionStorage.getItem('player'));
            DELAY = current_player.DELAY;
            MAX_HP = current_player.MAX_HP;
            current_hp = current_player.current_hp;
            multiplier = current_player.multiplier;
            if(`${sessionStorage.getItem('Highscore')}` == null){
                sessionStorage.getItem('Highscore', current_score)
            }
            value_hs = `${sessionStorage.getItem('Highscore')}`;
            sessionStorage.setItem('CurrentScore', current_score);
            if(value_hs < current_score){
                sessionStorage.setItem('Highscore', current_score);
            }
            current_score=0
            game()
        }else if(result.isDenied){
            initGame()
            initializeTabelPersonal()
        }
    })
}

$(document).ready(function () {
    initGame();
    getTopScor();
    loadScaryT();
});


function initGame() {
    Swal.fire({
        title: 'Introdu numele de demonslayer',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Incepe jocul',
        cancelButtonText: 'Modifica setari',
        showLoaderOnConfirm: true,
        preConfirm: (nume) => {
            sessionStorage.setItem('nume', nume)
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Numele dvs: ${sessionStorage.getItem('nume')}`
            }).then((result) => game())
        } else {
            Swal.fire({
                title: 'Alege dificultatea jocului',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Usor`,
                denyButtonText: `Mediu`,
                cancelButtonText: 'Greu'
            }).then((result) => {
                if (result.isConfirmed) {
                    DELAY = player_easy.DELAY
                    MAX_HP = player_easy.MAX_HP
                    current_hp = player_easy.current_hp
                    dificultate = player_easy.dificultate
                    multiplier = player_easy.multiplier
                    MAX_AMMOUNT = player_easy.MAX_AMMOUNT
                    sessionStorage.setItem('player', JSON.stringify(player_easy))
                    Swal.fire('Dificultate: usor', '', 'success').then((result) => {
                        initGame()
                    })

                } else if (result.isDenied) {
                    DELAY = player_medium.DELAY
                    MAX_HP = player_medium.MAX_HP
                    current_hp = player_medium.current_hp
                    dificultate = player_medium.dificultate
                    multiplier = player_medium.multiplier
                    MAX_AMMOUNT = player_medium.MAX_AMMOUNT
                    sessionStorage.setItem('player', JSON.stringify(player_medium))
                    Swal.fire('Dificultate: mediu', '', 'warning').then((result) => {
                        initGame()
                    })
                } else {
                    DELAY = player_hard.DELAY
                    MAX_HP = player_hard.MAX_HP
                    current_hp = player_hard.current_hp
                    dificultate = player_hard.dificultate
                    multiplier = player_hard.multiplier
                    MAX_AMMOUNT = player_hard.MAX_AMMOUNT
                    sessionStorage.setItem('player', JSON.stringify(player_hard))
                    Swal.fire('Dificultate: greu', '', 'error').then((result) => {
                        initGame()
                    })
                }
            })
        }
    })
}

function setScore(scor){
    if(localStorage.getItem('scoruri') == null){
        localStorage.setItem('scoruri',scor)
        console.log(scor)
    }else{
        scoruri_curente = localStorage.getItem('scoruri');
        scoruri_curente +=  `,${scor}`;
        localStorage.setItem('scoruri',scoruri_curente)
        console.log(scor)
        console.log(scoruri_curente)
    }
}

function getTopScor(){
    scoruri = localStorage.getItem('scoruri')
    scoruri = scoruri.split(',')
    scoruri.sort((a, b) => b - a);
    console.log(scoruri)


    $("#personal-best").html(buildTopScor(scoruri))
}

function buildTopScor(scoruri){
    html = ""

    for(i=0; i<5; i++){
        html += `                  <tr>
        <th scope="row">${i+1}</th>
        <td>${(scoruri[i] == undefined)? "loc liber": scoruri[i]}</td>
      </tr>`
    }
    return html;
}


function initializeTabelPersonal(){
    current_player = JSON.parse(sessionStorage.getItem('player'));
    $("#personal-info").html(buildPersonalInfo(current_player))
}


function buildPersonalInfo(current_player){
    html = ""
    html += ` 
    <div> Limita: ${current_player.MAX_AMMOUNT}</div>
    <div> Interval(ms): ${current_player.DELAY}</div>
    <div> Total Lives: ${current_player.MAX_HP}</div>
    <div> Dificultate: ${current_player.dificultate}</div>
    <div> Multiplier: ${current_player.multiplier}</div>
    `
    return html
}




function loadScaryT(){
    let nr = Math.floor(Math.random() * (5)) + 1
    $("#st").load(`scarythings.html #p${nr}`);
}
