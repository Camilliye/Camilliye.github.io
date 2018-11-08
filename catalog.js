// JavaScript source code
// JavaScript source code



//links are cafe-list info that we read from the data base and displays it
//in in the cafe-list tag in our html
const cafeList = document.querySelector('#item-list');
//create element and render cafe;

const form = document.querySelector('#add-item-form');

function renderCatalog(doc) {

    let li = document.createElement('li');
    let item = document.createElement('span');
    let price = document.createElement('span');
    let cross = document.createElement('div');


    li.setAttribute('data-id', doc.id);

    item.textContent = doc.data().item;
    price.textContent = doc.data().price;
    cross.textContent = 'x';

    //append this to the li
    li.appendChild(item);
    li.appendChild(price);
    li.appendChild(cross);


    //append li to the document
    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (event) => {
        event.stopPropagation(); 
        let id = event.target.parentElement.getAttribute('data-id');
        db.collection('catalogs').doc(id).delete();
    })

}                




//saving data
form.addEventListener('submit', (event) => {
    //1st prevent the page from reloading, bc we don't want that
    event.preventDefault();
    db.collection('catalogs').add({
        item: form.item.value,
        price: form.price.value
    });
    form.item.value = '';
    form.price.value = '';

})

//    window.alert("hey??");


//              real time listener          also gets data
db.collection('catalogs').orderBy('price').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.doc.data());
        if (change.type == 'added') {
            renderCatalog(change.doc);
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});

