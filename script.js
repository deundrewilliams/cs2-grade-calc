class Gradebook {
    constructor(syllabus_quiz, cl, eustis, assignments, exams, exit_survey) {
        this.syllabus_quiz = syllabus_quiz;
        this.cl = cl;
        this.eustis = eustis;
        this.assignments = assignments.sort((a, b) => b - a);
        this.exams = exams;
        this.exit_survey = exit_survey;
    }

    calc() {

        var total = 0;

        total += (this.syllabus_quiz * 10) * .05;
        total += (this.cl * 10) * .025;
        total += (this.eustis * 10) * .025;

        var assignment_total = 0;

        for (var i = 0; i < 7; i++) {
            if (i == 0) assignment_total += this.assignments[i] * .0775;
            if (i == 1) assignment_total += this.assignments[i] * .07;
            if (i >= 2 && i <=4) assignment_total += this.assignments[i] * .045;
            if (i == 5) assignment_total += this.assignments[i] * .0375;
            if (i == 6) assignment_total += this.assignments[i] * .03;
        }

        total += assignment_total;

        total += this.exams[0] * .18;
        total += this.exams[1] * .18;
        total += this.exams[2] * .18;

        total += this.exit_survey * .01;

        return total.toFixed(2);
    }
}


function updateGrade() {

    syllabus_quiz = document.getElementById('syllabus-quiz').value
    cl_ss = document.getElementById('command-line').value
    eustis_ss = document.getElementById('eustis').value

    assignment_1 = document.getElementById('assignment-1').value
    assignment_2 = document.getElementById('assignment-2').value
    assignment_3 = document.getElementById('assignment-3').value
    assignment_4 = document.getElementById('assignment-4').value
    assignment_5 = document.getElementById('assignment-5').value
    assignment_6 = document.getElementById('assignment-6').value
    assignment_7 = document.getElementById('assignment-7').value

    exam_1 = document.getElementById('exam-1').value
    exam_2 = document.getElementById('exam-2').value
    final_exam = document.getElementById('final-exam').value

    exit_survey = document.getElementById('exit-survey').value

    validated = validate_grades([syllabus_quiz, cl_ss, eustis_ss, assignment_1, assignment_2, assignment_3,
        assignment_4, assignment_5, assignment_6, assignment_7, exam_1, exam_2, final_exam, exit_survey])

    if (validated) {

        let myGrades = new Gradebook(syllabus_quiz, cl_ss, eustis_ss, [assignment_1, assignment_2, assignment_3,
            assignment_4, assignment_5, assignment_6, assignment_7], [exam_1, exam_2, final_exam], exit_survey)

        final_grade = myGrades.calc()

        total_grade = document.getElementById('total-grade').innerHTML = "Total Grade: " + final_grade + " " + letter_grade(final_grade)
    } else {
        total_grade = document.getElementById('total-grade').innerHTML = "Total Grade: N/A"
    }


}

function validate_grades(grades) {

    let empty_grades = grades.filter(grade => grade == "");

    if (empty_grades.length > 0) {
        return false;
    }


    return true;
}

function letter_grade(grade) {

    rounded_grade = parseFloat(grade).toFixed(2)

    switch(true) {
        case (grade < 60):
            return 'F'
        case (grade < 67):
            return 'D'
        case (grade < 77):
            return 'C'
        case (grade < 78.5):
            return 'C+'
        case (grade < 80):
            return 'B-'
        case (grade < 87):
            return 'B'
        case (grade < 88.5):
            return 'B+'
        case (grade < 90):
            return 'A-'
        default:
            return 'A'
    }


}
