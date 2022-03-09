//fisica
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Render = Matter.Render;

var engine, world;

//estado de jogo
var estadodejogo = "menu";

//sprite do cachorro
//var cachorro;
var cachorrobody;

//imagens cachorro
var carameloesq, caramelodir, pugesq, pugdir, huskyesq, huskydir;

//coisas da loja
var pugamostra, huskyamostra, biscoitopug, biscoitiohusky;
var loja;
var botaopug, botaohusky;
var estadopug = "livre";
var estadohusky = "livre";

//biscoitinhos
var biscoitos = 0;
var biscoitosimg;

//background
var back;

//botões menu
var botaoplay, botaoloja;

//blocos do jogo
var blocoinicio, blocofim;
var bloco1, bloco2, bloco3, bloco4, bloco5;
var blocoMovimento1, blocoMovimento2;
var blocoinvisivel;
var biscoito1, biscoito2;

//raça do cachorro
raca = "caramelo";

//cocozinho
var coco, cocoimg;

function adquirirpug(){
  if (estadodejogo == "loja" && estadopug == "livre" && biscoitos >= 2 && botaopug.mousePressed(()=>{}))
   //estado do pug
    estadopug = "comprado";

    //pagamento
    biscoitos = biscoitos - 2;


}

function adquirirhusky(){
  if (estadodejogo == "loja" && estadohusky == "livre" && biscoitos >= 4 && botaohusky.mousePressed(()=>{})){
    
    //estado do husky
    estadohusky = "comprado";

    //pagamento
    biscoitos = biscoitos - 4;
  }
}

function selecionarhusky(){
  if (estadodejogo == "loja" && estadohusky == "comprado" && botaohusky.mousePressed(()=>{})){
    
   cachorro.addImage(huskydir);

   raca = "husky";

  }
}

function selecionarpug(){
  if (estadodejogo == "loja" && estadopug == "comprado" && botaopug.mousePressed(()=>{})){
    
   cachorro.addImage(pugdir);

   raca = "pug"

  }
}

function sairloja(){
 
  //voltar pro menu
  estadodejogo = "menu";


}


function preload(){

  //fotos caramelo
  carameloesq = loadImage("carameloesq.png");
  caramelodir = loadImage("caramelodir.png");

  //fotos pug
  pugesq = loadImage("pugesq.png");
  pugdir = loadImage("pugdir.png");

  //fotos husky
  huskyesq = loadImage("huskyesq.png");
  huskydir = loadImage("huskydir.png")

  //imagem biscoito
  biscoitosimg = loadImage("biscoito.png");

  //background
  back = loadImage("parque.jpg");

  //cocô
  cocoimg = loadImage("cocô.png")


}

function setup() {
  createCanvas(1200,600);

  //coisas da física
  engine = Engine.create();
  world = engine.world;


  var render = Render.create({
	  element: document.body,
	  engine: engine,
	  options: {
	    width: 1600,
	    height: 700,
	    wireframes: false
	  }
	});

  Render.run(render);


  //cachorro
  cachorrobody = new cachorro(130,0,130,130);
  World.add(world,cachorrobody);

  //botões
  botaoplay = createButton("JOGAR");
  botaoplay.position(545,280);

  botaoloja = createButton("LOJA");
  botaoloja.position(550,320);

  //coisas da loja
  loja = createSprite(600,300,600,300);
  loja.shapeColor = "rgb(0,200,200)";
  
  pugamostra = createSprite(400,300);
  pugamostra.addImage(pugdir);
  pugamostra.scale = 0.8;

  huskyamostra = createSprite(800,300);
  huskyamostra.addImage(huskyesq);
  huskyamostra.scale = 0.7;

  biscoitohusky = createSprite(670,325);
  biscoitohusky.addImage(biscoitosimg);
  biscoitohusky.scale = 0.2

  biscoitopug = createSprite(510,325);
  biscoitopug.addImage(biscoitosimg);
  biscoitopug.scale = 0.2

  botaopug = createButton("COMPRAR/SELECIONAR");
  botaopug.position(320,400);

  botaohusky = createButton("COMPRAR/SELECIONAR");
  botaohusky.position(720,400);

  botaosairloja = createButton("X");
  botaosairloja.position(870,155);
  botaosairloja.mouseClicked(sairloja);


  //blocos jogo
  bloco1 = new blocos(800,170,150,20,"green");
  bloco7 = new blocos(1100,140,70,20,"green");
  bloco2 = new blocos(1050,370,110,20,"green");
  bloco3 = new blocos(900,430,90,20,"green");
  bloco4 = new blocos(780,500,100,20,"green");
  bloco5 = new blocos(300,570,100,20,"green");
  bloco8 = new blocos(310,420,90,20,"green");
  blocoMovimento1 = new blocos(300,200,120,20,"blue");
  blocoMovimento2 = new blocos(650,470,110,20,"blue");
  blocoinicio = new blocos(100,150,170,20,"yellow");
  blocofim = new blocos(0,510,150,20,"yellow");
  blocoinvisivel = new blocos(0,300,2000,20,rgb(75, 54, 33));

  //biscoitos
  biscoito1 = createSprite(1135,120,20,20);
  biscoito1.addImage(biscoitosimg);
  biscoito1.scale = 0.2;
  biscoito1.visible = false;

  biscoito2 = createSprite(350,400,90,20);
  biscoito2.addImage(biscoitosimg);
  biscoito2.scale = 0.2;
  biscoito2.visible = false;

  //coisas pra cair
  Engine.run(engine);

}

function draw() {
  background(back);
 
  

  drawSprites();

  if (estadodejogo == "menu"){

    //título
    textSize (60);
    fill("black");
    stroke("white");
    text("Passeio Canino :)", 350,120);

    //esconder loja
    pugamostra.visible = false;
    huskyamostra.visible = false;
    loja.visible = false;
    biscoitohusky.visible = false;
    biscoitopug.visible = false;
    botaohusky.hide();
    botaopug.hide();
    botaosairloja.hide();

    //aparecer de volta botoes menu
    botaoloja.show();
    botaoplay.show();


    //Se clicar nos botoes
    botaoplay.mousePressed(()=>{
      
      //esconder botoes
      botaoplay.hide();
      botaoloja.hide();

      //estadode jogo
      estadodejogo = "jogo";
    })

    botaoloja.mousePressed(()=>{
      
      //esconder botoes
      botaoplay.hide();
      botaoloja.hide();

      //estadode jogo
      estadodejogo = "loja";
      
      
    })

  }

  if (estadodejogo == "loja"){

    //textos como titulos e numeros(preços)
    textSize (40);
    fill("black");
    stroke("white");
    text("2", 500,300);

    textSize (40);
    fill("black");
    stroke("white");
    text("4", 660,300);

    textSize (40);
    fill("black");
    stroke("white");
    text("LOJA", 530,220);

    //mostrar loja
    pugamostra.visible = true;
    huskyamostra.visible = true;
    loja.visible = true;
    biscoitohusky.visible = true;
    biscoitopug.visible = true;
    botaohusky.show();
    botaopug.show();
    botaosairloja.show();

    console.log(estadopug);
    console.log(biscoitos);
    console.log(estadodejogo);

  
  
  }

  if (estadodejogo == "jogo"){

    //mostrar cachorro e biscoitos
    biscoito1.visible = true;
    biscoito2.visible = true;
    //image(caramelodir,cachorrobody.position.x, cachorrobody.position.y, 100,100);
    cachorrobody.display();
console.log(cachorrobody.body)

    //mostrar os blocos
    bloco1.display();
    bloco7.display();
    bloco2.display();
    bloco3.display();
    bloco4.display();
    bloco5.display();
    bloco8.display();
    blocoMovimento1.display();
    blocoMovimento2.display();
    blocoinicio.display();
    blocofim.display();
    blocoinvisivel.display();

    //mostrar cocôs
    for (var i = 20; i < 920; i=i+40){
      var coco = createSprite(i, 280, 20, 20);
     coco.addImage(cocoimg);
     coco.scale = 0.2
    }



    if(keyDown(LEFT_ARROW) && raca == "caramelo"){
      
      //cachorro imagem
      //cachorro.addImage(carameloesq);

      
     // Matter.Body.applyForce(cachorrobody.body,{x:0,y:0},{x:-5,y:0});

     Matter.Body.setPosition(cachorrobody.body,{x:cachorrobody.body.position.x+=1,y:cachorrobody.body.position.y});
     cachorrobody.body.restitution=0;
     cachorrobody.body.angularSpeed=0;
     cachorrobody.body.angularVelocity=0;
     Matter.Body.setStatic(cachorrobody.body,false);
     //cachorrobody.body.velocity.x +=10
     //console.log(cachorrobody.body.velocity.x)

      //andar
     // cachorrobody.position.x = cachorrobody.position.x - 2.5;
    }
    else {
     // Matter.Body.applyForce(cachorrobody.body,{x:0,y:0},{x:0,y:0});

     Matter.Body.setPosition(cachorrobody.body,{x:cachorrobody.body.position.x,y:cachorrobody.body.position.y});

     cachorrobody.body.speed = 0;
    cachorrobody.body.velocity.x=0;
    cachorrobody.body.restitution=0;
    cachorrobody.body.angularSpeed=0;
    cachorrobody.body.angularVelocity=0;
    Matter.Body.setStatic(cachorrobody.body,true);
    }
   

    /*if(keyDown(LEFT_ARROW) && raca == "pug"){
      
      //cachorro imagem
      cachorro.addImage(pugesq);

      //andar
      //Matter.Body.setPosition(cachorrobody,{x:cachorrobody.position.x-2.5,y:0});
     // cachorrobody.position.x = cachorrobody.position.x - 2.5;
    }

    if(keyDown(LEFT_ARROW) && raca == "husky"){
      
      //cachorro imagem
      cachorro.addImage(huskyesq);
      //Matter.Body.setPosition(cachorrobody,{x:cachorrobody.position.x-2.5,y:0});
      //andar
     // cachorrobody.position.x = cachorrobody.position.x - 2.5;
    }

    if(keyIsDown(RIGHT_ARROW) && raca == "caramelo"){
      
      //cachorro imagem
      //cachorro.addImage(caramelodir);

      Matter.Body.applyForce(cachorrobody.body,cachorrobody.body.position,{x:5,y:0});

      //andar
     // cachorrobody.position.x = cachorrobody.position.x + 0.5;
    }else {
      Matter.Body.applyForce(cachorrobody.body,cachorrobody.body.position,{x:0,y:0});
      cachorrobody.body.speed = 0;
    }

    if(keyDown(RIGHT_ARROW) && raca == "pug"){
      
      //cachorro imagem
      cachorro.addImage(pugdir);

      //andar
      cachorrobody.position.x = cachorrobody.position.x + 2.5;
    }

    if(keyDown(RIGHT_ARROW) && raca == "husky"){
      
      //cachorro imagem
      cachorro.addImage(huskydir);

      //andar
      cachorrobody.position.x = cachorrobody.position.x + 2.5;
    }

    if(keyDown("space")){
      
      //pular
      cachorrobody.position.y = cachorrobody.position.y - 4.5;
    }
*/
  }

    
}