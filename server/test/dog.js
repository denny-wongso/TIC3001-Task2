process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

const dotenv = require("dotenv");
dotenv.config();

const url = "/api/v1/dogs"
const token = process.env.TOKEN
describe("Dogs", () => {
    describe("GET " + url, () => {
        console.log(token)
        // Test to get all dogs record
        it("should get all dogs record", (done) => {
             chai.request(app)
                 .get(url)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test to get single dog record
        it("should get a single dog record", (done) => {
             const id = 1;
             chai.request(app)
                 .get(url + `/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to get single unavailable dog record
        it("should not get a single dog record", (done) => {
             const id = 50000000000;
             chai.request(app)
                 .get(url + `/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });
    });

    describe("POST " + url, () => {
        // Test success added a dog
        it("should add a new dog record", (done) => {
             chai.request(app)
                 .post(url)
                 .field('Content-Type', 'multipart/form-data')
                 .field('name', 'kaki')
                 .field('age', '1')
                 .field('gender', 'male')
                 .field('breed', 'golden retriever')
                 .field('test', 'true')
                 .attach('image', './test/havanese.png')
                 .set('Authorization', `Bearer ${token}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });

        // Test fail added a dog with empty body
        it("should not add a new dog record", (done) => {
            chai.request(app)
                .post(url)
                .field('Content-Type', 'multipart/form-data')
                .set('Authorization', `Bearer ${token}`)
                .field('test', 'true')
                .attach('image', './test/havanese.png')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test fail wrong gender
        it("should not add a new dog record invalid gender", (done) => {
             chai.request(app)
                 .post(url)
                 .field('Content-Type', 'multipart/form-data')
                 .field('name', 'kaki')
                 .field('age', '1')
                 .field('gender', 'binary')
                 .field('breed', 'golden retriever')
                 .set('Authorization', `Bearer ${token}`)
                 .field('test', 'true')
                 .attach('image', './test/havanese.png')
                 .end((err, res) => {
                     res.should.have.status(400);
                     res.body.should.be.a('object');
                     done();
                  });
        });

        // Test fail wrong age
        it("should not add a new dog record invalid age", (done) => {
             chai.request(app)
                 .post(url)
                 .field('Content-Type', 'multipart/form-data')
                 .field('name', 'kaki')
                 .field('age', 'abc')
                 .field('gender', 'female')
                 .field('breed', 'golden retriever')
                 .set('Authorization', `Bearer ${token}`)
                 .field('test', 'true')
                 .attach('image', './test/havanese.png')
                 .end((err, res) => {
                     res.should.have.status(400);
                     res.body.should.be.a('object');
                     done();
                  });
        });
    });

    describe("PUT " + url, () => {
        const id = 2
        // Test success update a dog
        it("should update a dog record", (done) => {
             chai.request(app)
                 .put(url + `/${id}`)
                 .field('Content-Type', 'multipart/form-data')
                 .field('name', 'kaki')
                 .field('age', '2')
                 .field('gender', 'female')
                 .field('breed', 'golden retriever')
                 .set('Authorization', `Bearer ${token}`)
                 .field('test', 'true')
                 .attach('image', './test/havanese.png')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test fail update a dog record
        it("should not update a dog record", (done) => {
            const id = 2
            chai.request(app)
                .put(url + `/${id}`)
                .field('Content-Type', 'multipart/form-data')
                .set('Authorization', `Bearer ${token}`)
                .field('test', 'true')
                .attach('image', './test/havanese.png')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test fail wrong gender
        it("should not update a dog record invalid gender", (done) => {
            const id = 2
             chai.request(app)
                 .put(url + `/${id}`)
                 .field('Content-Type', 'multipart/form-data')
                 .field('name', 'kaki')
                 .field('age', '2')
                 .field('gender', 'binary')
                 .field('breed', 'golden retriever')
                 .field('test', 'true')
                 .set('Authorization', `Bearer ${token}`)
                 .attach('image', './test/havanese.png')
                 .end((err, res) => {
                     res.should.have.status(400);
                     res.body.should.be.a('object');
                     done();
                  });
        });

        // Test fail wrong age
        it("should not update a dog record invalid age", (done) => {
            const id = 2
             chai.request(app)
                 .put(url + `/${id}`)
                 .field('Content-Type', 'multipart/form-data')
                 .field('name', 'kaki')
                 .field('age', 'abc')
                 .field('gender', 'female')
                 .field('breed', 'golden retriever')
                 .field('test', 'true')
                 .set('Authorization', `Bearer ${token}`)
                 .attach('image', './test/havanese.png')
                 .end((err, res) => {
                     res.should.have.status(400);
                     res.body.should.be.a('object');
                     done();
                  });
        });

        // Test fail wrong dog
        it("should not update a dog record invalid dog", (done) => {
            var body = {}
            const id = 20000000
             chai.request(app)
                 .put(url + `/${id}`)
                 .field('Content-Type', 'multipart/form-data')
                 .field('name', 'kaki')
                 .field('age', '2')
                 .field('gender', 'female')
                 .field('breed', 'golden retriever')
                 .field('test', 'true')
                 .set('Authorization', `Bearer ${token}`)
                 .attach('image', './test/havanese.png')
                 .end((err, res) => {
                     res.should.have.status(404);
                     res.body.should.be.a('object');
                     done();
                  });
        });
    });

    describe("DELETE " + url, () => {
        // Test success delete a dog
        it("should delete a dog record", (done) => {
            const id = 6 
             chai.request(app)
                 .delete(url + `/${id}`)
                 .set('Authorization', `Bearer ${token}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test fail delete a dog record
        it("should not delete a dog record", (done) => {
            const id = 100
            chai.request(app)
                .delete(url + `/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
