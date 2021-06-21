'use strict';
let productname = [];
let Shown = [];
let clicked = [];

let totalClicks = 0;
let maxClicks = 25;

function Proudct(name, Path, id) {
    this.name = name;
    this.Path = Path;
    this.id = id;
    this.timeShown = 0;
    this.timesClicked = 0;
    Items.push(this);
}
let Items = [];

let names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
let paths = ['images/bag.jpg', 'images/banana.jpg', 'images/bathroom.jpg', 'images/boots.jpg', 'images/breakfast.jpg', 'images/bubblegum.jpg', 'images/chair.jpg', 'images/cthulhu.jpg', 'images/dog-duck.jpg', 'images/dragon.jpg', 'images/pen.jpg', 'images/pet-sweep.jpg', 'images/scissors.jpg', 'images/shark.jpg', 'images/sweep.png', 'images/tauntaun.jpg', 'images/unicorn.jpg', 'images/usb.gif', 'images/water-can.jpg', 'images/wine-glass.jpg'];
let ids = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

function createItems() {
    for (let i = 0; i < names.length; i++) {
        new Proudct(names[i], paths[i], ids[i]);
    }
}
createItems();

let thisRound = [];
let lastRound = [];

//make a function that randomly selects three images out of the images we've already created.
function makeThreeImages() {
    for (let i = 1; i < 4; i++) {
        let indexNum = Math.floor(Math.random() * Items.length);

        if (lastRound.includes(indexNum) || thisRound.includes(indexNum)) {
            i--;
        } else {
            thisRound.push(indexNum);
            Items[indexNum].timeShown++;
            let linkedImage = document.getElementById('image-' + i);
            linkedImage.setAttribute('src', Items[indexNum].Path);
            linkedImage.setAttribute('itemIdx', indexNum);

        }
    }
    //assign lastRound to thisRound so current set of numbers is reserved
    lastRound = thisRound;
    thisRound = [];
}
makeThreeImages();

//add an event listener to every img tag
for (let i = 0; i < document.getElementsByClassName('clickable').length; i++) {
    let image = document.getElementById('image-' + (i + 1));
    image.addEventListener('click', onClick);
}

//let itemClicks = [];

function onClick(event) {
    let itemIdx = parseInt(event.target.getAttribute('itemIdx'));
    let itemIWant = Items[itemIdx];
    itemIWant.timesClicked++;
    makeThreeImages();
    totalClicks++;
    if (totalClicks === maxClicks) {
        for (let i = 0; i < document.getElementsByClassName('clickable').length; i++) {
            let image = document.getElementById('image-' + (i + 1));
            image.removeEventListener('click', onClick);
        }

        //let list = document.getElementById('list');
        for (let j = 0; j < Items.length; j++) {
            //let li = document.createElement('li');
            //li.innerText = Items[j].name + ' was clicked ' + Items[j].timesClicked + ' times out of ' + Items[j].timeShown;
            //list.appendChild(li);
            productname.push(Items[j].name);
            Shown.push(Items[j].timeShown);
            clicked.push(Items[j].timesClicked);
            drawchart();

        }

    }

};


async function drawchart() {
    await makeThreeImages();
    var ctx = document.getElementById('myChart').getContext('2d');
    var mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                backgroundColor: '#FF0000',
                label: 'clicked Times',
                data: clicked,
                // this dataset is drawn below
                order: 2
            }, {
                backgroundColor: '#000080',
                label: 'Shown Times',
                data: Shown,
                type: 'bar',

                // this dataset is drawn on top
                order: 1
            }],
            labels: productname,
        },
    });
};


