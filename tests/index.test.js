const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create admin user
  await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: await require('bcrypt').hash('password123', 10),
    role: 'Admin'
  });

  // Login to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@example.com', password: 'password123' });

  token = res.body.token;
});

describe('Module One Core Tests', () => {
  test('Login returns token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Accessing protected route without token fails', async () => {
    const res = await request(app).get('/api/activity-tracker');

    expect(res.statusCode).toBe(401);
  });

  test('Accessing protected route with token succeeds', async () => {
    const res = await request(app)
      .get('/api/activity-tracker')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Activity is logged when route is accessed', async () => {
    await request(app)
      .get('/api/activity-tracker')
      .set('Authorization', `Bearer ${token}`);

    const activityRes = await request(app)
      .get('/api/activity-tracker')
      .set('Authorization', `Bearer ${token}`);

    expect(activityRes.body.length).toBeGreaterThan(0);
  });

  test('Wrong login credentials fail', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });

    test('Admin creates a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Student One',
          email: 'student1@example.com',
          password: 'studentpass',
          role: 'Student'
        });
  
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Student One');
    });
  
    test('Admin creates a course', async () => {
      const res = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Intro to AI',
          description: 'Basics of Artificial Intelligence',
          code: 'AI101'
        });
  
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('Intro to AI');
    });
  
    test('Admin creates a cohort', async () => {
      const res = await request(app)
        .post('/api/cohorts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Cohort July 2025',
          description: 'Students starting July 2025'
        });
  
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Cohort July 2025');
    });
  
    test('Admin creates an intake', async () => {
      const res = await request(app)
        .post('/api/intakes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Intake 2025',
          startDate: '2025-07-01',
          endDate: '2025-12-15'
        });
  
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Intake 2025');
    });
  
    test('Admin creates a facilitator', async () => {
      const res = await request(app)
        .post('/api/facilitators')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Dr. Jane Doe',
          email: 'jane.doe@example.com',
          bio: 'Expert in Machine Learning'
        });
  
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Dr. Jane Doe');
    });
  });  

afterAll(async () => {
  await sequelize.close();
});
