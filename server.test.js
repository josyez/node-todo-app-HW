import request from "supertest";
import createServer from "./server.js";

const server = await createServer();

//test to check if user is unathorize
describe("Just testing the server", function(){
    describe("Testin the /todo route", function(){
        it("Should be unable to get todos without flag", function(done){
            request(server).get("/todo").expect(401).end(function(err){
                if(err){
                    throw err;
                } else {
                    done();
                }
            })
        });

        it("should be able to get all todos", function(done){
            request(server).get("/todo?admin=true").expect(200).end(function(err, response){
                if(err){
                    throw err;
                } else {
                    done();
                }
            });
        });

        it("should be able to get specific todo", function(done){
            request(server).get("/todo/JViz?admin=true").expect(200).end(function(err, response){
                if(err){
                    throw err;
                }else{
                    done();
                }
            });
        });


        it("should be able to create a new todo", function(done){
            request(server).post("/todo?admin=true").send({todo: "clean the garage"}).set('Accept', 'application/json').expect(200).end(function(err, response){
                if(err){
                    throw err;
                } else {
                    expect(response.body).toEqual({ success: true });
                        done()
                }
            })
        });

        it("should be able to update a todo", function(done){
            request(server).put("/todo/0qB6?admin=true").send({todo: "clean the floor"
        }).expect(200).end(function(err, response){
            if(err){
                throw err;
            } else {
                // return done (err);
                expect(response.body).toEqual({ success: true });
                done();
            }
        })
        })

        //it.only => to only test one 
        it("should be able to delete a todo", function(done){
            request(server).delete("/todo/tJNP?admin=true").expect(200).end(function(err, response){
                if(err){
                    throw err;
                } else {
                    // return done(err);
                    
                    done();
                }
            });
        });



    })
})



