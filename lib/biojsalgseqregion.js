/*
 * biojs-alg-seqregion
 * https://github.com/homonecloco/biojs-alg-seqregion
 *
 * Copyright (c) 2014 Ricardo H. Ramirez-Gonzalez
 * Licensed under the Apache 2 license.
 */

/**
@class biojsalgseqregion
*/

/**
 * Private Methods
 */

/*
 * Public Methods
 */

 var parse_seq_region = function (reg){
 	ent=reg.split(":");
 	indeces=ent[1].split("-")
 	var reg = new SeqRegion(ent[0], indeces[0], indeces[1]);
 	return reg;
 };

module.exports.parse_seq_region = parse_seq_region;

 var SeqRegion = function(entry, start, end) {
 	this.entry = entry,10;
 	this.start = parseInt(start,10);
 	this.end = parseInt(end,10);
 };

 SeqRegion.prototype.toString = function() {
 	return  this.entry + ":" + this.start  + "-" + this.end;
 };

 SeqRegion.prototype.clone = function(){
 	return new SeqRegion(this.entry, this.start, this.end);
 };

 SeqRegion.prototype.length = function(){
 	return this.end - this.start;
 };

 SeqRegion.prototype.move = function(bases) {
 	var len = this.length();
 	this.end += bases;
 	this.start += bases;
 };


 SeqRegion.prototype.overlaps = function(other){
 	if(other.entry != this.entry){
 		return false;
 	}
 	if(other.start >= this.start && other.start <= this.end){
 		return true;
 	}

 	if(other.end <= this.start &&  other.end >= this.end){
 		return true;
 	}

 	if(other.start <= this.start && (other.end <= this.end && other.end >= this.start )){
 		return true;
 	}
 	return false;
 };

 SeqRegion.prototype.subset = function(other){
 	if(other.start >= this.start && other.end <= this.end){
 		return true;
 	}
 	return false;
 }; 

 SeqRegion.prototype.valid_position = function(pos){
 	if(this.start <= pos && this.end >= pos){
 		return true;
 	}else{
 		return false;
 	}
 };



 SeqRegion.prototype.expand_flanking_region = function(flanking_size){
 	out = this.clone();
 	out.end += flanking_size;
 	out.start -= flanking_size;
 	if(out.start < 1){
 		out.start = 1;
 	}
 	return out;
 };

 SeqRegion.prototype.middle = function(){
 	var middle = (this.start + this.end ) / 2; 
 	return middle;
 };

 SeqRegion.prototype.joinRegion = function(other){
 	var out = this.clone();

 	if(other.start < out.start){
 		out.start = other.start;
 	}

 	if(other.end > out.end){
 		out.end = other.end;
 	}

 	return out;
 };

  //This returns the region that is missing from the cache
  SeqRegion.prototype.getRegionComplement = function(other){

    //console.log("getRegionComplement comparing: ");
    //console.log(JSON.stringify(other));
    //console.log(JSON.stringify(this));
    var  out = other.clone();
    if (!this.overlaps(other)){
     // console.log("Doesnt overlap!");
     return out;
 }

 if(this.subset(other)){
      //console.log("other is a subset");
      return null;
  }
  if(other.subset(this)){
      //console.log("this is a subset");
      return null; //A null tells you don't need to load again. 
  }

  if(other.start < this.start){
      //console.log("other.start < this.start");
      out.end = this.start;
  }

  if (other.end > this.end){
      //console.log("other.end < this.end");
      out.start = this.end;
  }
  return out;
};


module.exports.SeqRegion = SeqRegion;