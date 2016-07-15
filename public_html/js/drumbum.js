

function DrumBum() {
	this.width=16;
	this.samples=[
		"clap-808",
		"hihat-dist02",
		"kick-heavy",
		"openhat-slick",
		"snare-808",
		"snare-smasher",
		"clap-analog",
		"hihat-electro",
		"kick-newwave",
		"openhat-tight",
		"snare-acoustic01",
		"snare-sumo",
		"clap-crushed",
		"hihat-plain",
		"kick-oldschool",
		"perc-808",
		"snare-acoustic02",
		"snare-tape",
		"clap-fat",
		"hihat-reso",
		"kick-plain"
	];
	this.pattern=[];

	this.loadSamples=function() {
		
	}

	this.getGrid=function() {
		var html="<table class='grid'>";
		for (j in this.samples) {
			html+="<tr>";
			html+="<td>"+this.samples[j]+"</td>";
			for (var i=0; i<this.width; i++) {
				var gridID="sample"+j+"box"+i;
				html+="<td id='"+gridID+"'>";
				html+="<p class='beat' data-sample="+j+" data-box="+i+">";
				html+="</td>";
			}
			html+="</tr>";
		}
		html+="</table>";
		return html;
	}

	this.makeGrid=function() {
		var thisDB=this; // so we can reference self inside jQuery
		$('body').append(this.getGrid());
		$('table.grid .beat').click(function() {
			var sample=$(this).data('sample');
			var box=$(this).data('box');
			
			var thisBeat=thisDB.getBeat(box,sample);
			console.log(thisBeat);
			if (thisBeat>50) {
				thisDB.changeBeat(box,sample,0);
			} else if (thisBeat>0) {
				thisDB.changeBeat(box,sample,100);
			} else {
				thisDB.changeBeat(box,sample,50);
			}
		});
	}

	this.changeBeat=function(box,sample,velocity) {
		if (!this.pattern[box]) this.pattern[box]=[];
		this.pattern[box][sample]=velocity;
		
		var title="#sample"+sample+"box"+box;
		$beat=$(title+' p.beat');
		if (velocity>50) {
			$beat.removeClass('light');
			$beat.addClass('heavy');
		} else if (velocity>0) {
			$beat.removeClass('heavy');
			$beat.addClass('light');
		} else {
			$beat.removeClass('heavy');
			$beat.removeClass('light');
		}
	}

	this.getBeat=function(box,sample) {
		if (!this.pattern[box] || !this.pattern[box][sample]) return false;
		return this.pattern[box][sample];
	}

	this.getColumn=function(box) {
		var column=[];
		for (i in this.samples) {
			column[i]=this.getBeat(box,i);
		}
		return column;
	}

	this.playColumn=function(box) {
		var column=this.getColumn(box);
		console.log('play column '+box);
		console.log(column);
	}

	this.playPattern=function() {
		var i=0;
		var thisDB=this;
		var p;
		p=setInterval(function() {
			if (i>=thisDB.width) {
				clearInterval(p);
			} else {
				thisDB.playColumn(i);
			}
			i++;
		},500);
	}

	this.playSound=function(sample, velocity) {

	}

	this.setupButtons=function() {
		var thisDB=this;
		$('#play').click(function() {
			thisDB.playPattern();
		});
	}
}

$().ready(function() {
	DrumBum=new DrumBum();
	DrumBum.makeGrid();
	DrumBum.setupButtons();

})

/*

var context;
var bufferLoader;

function init() {
    try {
        context = new AudioContext();
    }
    catch(e) {
        alert("Web Audio API is not supported in this browser");
    }
    
    // Start loading the drum kit.
    bufferLoader = new BufferLoader(
        context,
        [
        "sounds/kick.wav",
        "sounds/snare.wav",
        "sounds/hihat.wav"
        ],
        bufferLoadCompleted  
    );

    bufferLoader.load();
}

function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
}

// Plays Rhythm 1
function startPlayingRhythm1(bufferList) {
    var kick = bufferList[0];
    var snare = bufferList[1];
    var hihat = bufferList[2];
    
    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = context.currentTime + 0.100;
    
    var tempo = 120; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo;

    // Play the kick drum on beats 1, 2, 3, 4
    playSound(kick, startTime);
    playSound(kick, startTime + quarterNoteTime);
    playSound(kick, startTime + 2*quarterNoteTime);
    playSound(kick, startTime + 3*quarterNoteTime);

    // Play the snare drum on beats 2, 4
    playSound(snare, startTime + quarterNoteTime);
    playSound(snare, startTime + 3*quarterNoteTime);
    
    // Play the hi-hat every 16th note.
    for (var i = 0; i < 16; ++i) {
        playSound(hihat, startTime + i*0.25*quarterNoteTime);
    }
}

// Plays Rhythm 2
function startPlayingRhythm2(bufferList) {
    var kick = bufferList[0];
    var snare = bufferList[1];
    var hihat = bufferList[2];
    
    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = context.currentTime + 0.100;
    
    var tempo = 80; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo;

    // Play the kick drum on beats 1, 2, 3, 4
    playSound(kick, startTime);
    playSound(kick, startTime + 0.5*quarterNoteTime);	
    playSound(kick, startTime + 1.75*quarterNoteTime);
    playSound(kick, startTime + 2*quarterNoteTime);
    playSound(kick, startTime + 2.5*quarterNoteTime);
	
    // Play the snare drum on beats 2, 4
    playSound(snare, startTime + quarterNoteTime);
    playSound(snare, startTime + 3*quarterNoteTime);
    playSound(snare, startTime + 3.75*quarterNoteTime);	
    
    // Play the hi-hat every 16th note.
    for (var i = 0; i < 16; ++i) {
        playSound(hihat, startTime + i*0.25*quarterNoteTime);
    }
    playSound(hihat, startTime + 3.125*quarterNoteTime);
	
}

function bufferLoadCompleted() {
	
}

*/





/*
		perc-chirpy.mp3		snare-analog.mp3	snare-vinyl01.mp3
clap-slapper.mp3	hihat-ring.mp3		kick-slapback.mp3	perc-hollow.mp3		snare-big.mp3		snare-vinyl02.mp3
clap-tape.mp3		kick-808.mp3		kick-softy.mp3		perc-laser.mp3		snare-block.mp3		tom-808.mp3
cowbell-808.mp3		kick-acoustic01.mp3	kick-stomp.mp3		perc-metal.mp3		snare-brute.mp3		tom-acoustic01.mp3
crash-808.mp3		kick-acoustic02.mp3	kick-tape.mp3		perc-nasty.mp3		snare-dist01.mp3	tom-acoustic02.mp3
crash-acoustic.mp3	kick-big.mp3		kick-thump.mp3		perc-short.mp3		snare-dist02.mp3	tom-analog.mp3
crash-noise.mp3		kick-classic.mp3	kick-tight.mp3		perc-tambo.mp3		snare-dist03.mp3	tom-chiptune.mp3
crash-tape.mp3		kick-cultivator.mp3	kick-tron.mp3		perc-tribal.mp3		snare-electro.mp3	tom-fm.mp3
hihat-808.mp3		kick-deep.mp3		kick-vinyl01.mp3	perc-weirdo.mp3		snare-lofi01.mp3	tom-lofi.mp3
hihat-acoustic01.mp3	kick-dry.mp3		kick-vinyl02.mp3	ride-acoustic01.mp3	snare-lofi02.mp3	tom-rototom.mp3
hihat-acoustic02.mp3	kick-electro01.mp3	kick-zapper.mp3		ride-acoustic02.mp3	snare-modular.mp3	tom-short.mp3
hihat-analog.mp3	kick-electro02.mp3	openhat-808.mp3		shaker-analog.mp3	snare-noise.mp3
hihat-digital.mp3	kick-floppy.mp3		openhat-acoustic01.mp3	shaker-shuffle.mp3	snare-pinch.mp3
hihat-dist01.mp3	kick-gritty.mp3		openhat-analog.mp3	shaker-suckup.mp3	snare-punch.mp3
*/