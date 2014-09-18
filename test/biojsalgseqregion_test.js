/*
 * biojs-alg-seqregion
 * https://github.com/homonecloco/biojs-alg-seqregion
 *
 * Copyright (c) 2014 Ricardo H. Ramirez-Gonzalez
 * Licensed under the Apache 2 license.
 */

var chai = require('chai');
chai.expect();
chai.should();

var biojsalgseqregion = require('../lib/biojsalgseqregion.js');

describe('biojs-alg-seqregion module', function(){
  describe('#parse_bam_region()', function(){
    it('should a region', function(){
      var reg = biojsalgseqregion.parse_seq_region("Sequence:10-200");
      reg.entry.should.equal("Sequence");
      reg.start.should.equal(10);
      reg.end.should.equal(200);

      reg.toString().should.equal("Sequence:10-200");

      var cloned = reg.clone()
      cloned.toString().should.equal("Sequence:10-200");

      reg.length().should.equal(190);

      reg.move(10);
      reg.toString().should.equal("Sequence:20-210");
	  cloned.toString().should.equal("Sequence:10-200");
      
      cloned.overlaps(reg).should.equal(true);
      reg.overlaps(cloned).should.equal(true);

      var disjoint = biojsalgseqregion.parse_seq_region("Sequence:300-400");
      var subset = biojsalgseqregion.parse_seq_region("Sequence:30-40");

      reg.overlaps(disjoint).should.equal(false);
      disjoint.overlaps(reg).should.equal(false);

  //TODO: finish all the testing for the rest of the functions. 

    });
  });
});
