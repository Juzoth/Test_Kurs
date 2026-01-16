
import React from 'react';

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => {
    console.log('Wszystkie:', sum, 'dodaje part:', part.name, 'part ma', part.exercises);
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <p>Total exercises {totalExercises}</p>
    </div>
  );
};

export default Course;