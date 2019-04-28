var request = require('supertest');
var expect = require('chai').expect;
var should = require('should');
var fs = require('fs');
var url = "http://preview.airwallex.com:30001";
var dataFileName = 'testCaseJson.json';
var dataFile = fs.readFileSync(dataFileName);
var tests = JSON.parse(dataFile).tests;

describe('测试状态码',function(){
	this.timeout(10000);
	tests.forEach(function(test){
		it(test.description,function(done){
			request(url)
			.post('/bank')
			.send(test.info)
			.end(function (error,response){
			expect(response.statusCode).to.equal(test.response.statusCode);
//			should(response.statusCode).eqls(test.response.statusCode);
			if(error) throw error;
			done();
		})
	})
	})
})
