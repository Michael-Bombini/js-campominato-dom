/*
Consegna
Generare una griglia di gioco quadrata , in cui ogni cella contiene un numero incrementale tra quelli compresi tra 1 e 100
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
Bonus
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
*/


//recupero elementi dal DOM 
const campoMinato = document.querySelector(".campo-minato");
const difficolta = document.getElementById("difficulty");
const play = document.getElementById("play");
const score = document.querySelector(".score");

//funzione che ci ritornerà il valore corrente della difficoltà che è stata selezionata
function selectDifficulty(){
    const difficoltaValue = difficolta.value;
    return difficoltaValue;

}


//funzione che genererà la griglia effettivamente
function createGrid(xCol, yRow) {
    //variabili usate per contare le caselle cliccate
    //e quante di loro cliccate sono bombe
    let count = 0 ;
    let contabombe = 0;
    score.innerHTML = "";
    //totale caselle della grid 
    const totGrid = xCol * yRow;
  
    //imposto la dimensione basandomi su quante sono le celle sull'asse X 
    campoMinato.style.width = `calc(50px * ${xCol})`;
    campoMinato.innerHTML = "";

    //genero l'array con le bombe
   let bombe = generaBombe(totGrid);
   let maxPunti = totGrid-16;

    // itero fino a quanto non creo tutti gli elementi della griglia
    for (let i = 1; i <= totGrid ; i++) {
        
      // creo la cella e poi con append la inserisco all'interno della griglia
      const cell = document.createElement("div");
      cell.classList.add("cell");
    
      //inserisco l'indice come testo del div cella
      cell.dataset.indice = `${i}`;
      cell.classList.add("counted");
    
      //inserisco la cella nel container campoMinato
      campoMinato.append(cell);

      //verifico se la cella è stata clickata e in quel caso gli aggiungo la classe attivo 
      cell.addEventListener("click" , function(){
        cell.classList.add("attivo");
        if(cell.classList.contains("counted")){
            cell.classList.remove("counted")
            count++;
            
        }
        cell.innerText = this.dataset.indice;
        if(bombe.includes(+this.dataset.indice)){
            alert("Hai beccato una bomba hai perso");
            contabombe++;
            alert(`I punti totalizzati sono ${count-contabombe} `);
            this.classList.add("bomb");
            
        }


        if(count-contabombe===maxPunti)
            alert("hai vinto");

        score.innerHTML = count-contabombe;

    });
    }



}
  


//ascoltatyore di evento che richiamerà la funzione generate grid
//in base alla difficoltà che è stata ritornata dalla funzione select difficulty (easy , normal , hard)
play.addEventListener("click" , function(){
    const getDifficolta = selectDifficulty();
    switch(getDifficolta){
        case "easy" :
            createGrid(10,10);
            break;
        case "normal" :
            createGrid(9,9);
            break;
        case "hard" :
            createGrid(7,7);
            break;
     
    }
    });



//funzione che genererà l'array contenente le N bombe 
//( il numero max delle bombe si basa su tot grid che sarà passato come parametro )
function generaBombe(totGrid){
    const bombe = [];

    do{
        const randomBomba = Math.floor(Math.random() * totGrid )+1;

        if(!bombe.includes(randomBomba))
            bombe.push(randomBomba);
    }while(bombe.length<16);


    return bombe;
}

  
