function getSubjectsName() {
  let subjectsAmount = parseInt($('#amount').val());
  let inputDiv = $('#input-div');
  // Clear previous mark inputs
  inputDiv.empty();

  // init array to store all subject names
  let subjectArray = [];

  for (let i = 1; i <= subjectsAmount; i++) {
    let subjectsID = `subject-name-${i}`;
    let newHTML = `
          <div class="mb-0">
              <label for="${subjectsID}">Subject ${i}</label>
              <input type="text" class="form-control rounded-1" name="${subjectsID}" id="${subjectsID}" placeholder="enter subject name..." required>
          </div>`;
    inputDiv.append(newHTML);

    // listener for each input to update the subjectArray when its changed
    $(`#${subjectsID}`).on('change', function () {
      // stores each subject name into the empty array
      subjectArray[i - 1] = $(this).val();
      // Updates this whenever a subject name changes
      getSubjectsMark(subjectArray);
    });
  }
}

function getSubjectsMark(subjectArray) {
  let inputDiv2 = $('#input-div-2');
  // Clear the previous marks input
  inputDiv2.empty();

  // Create new 'mark' inputs based on subject names
  subjectArray.forEach((subjectName, index) => {
    if (subjectName) { // Check if subjectName is not empty
      let newHTML2 = `
              <div class="mb-0">
                  <label for="${subjectName}-mark">${subjectName.toUpperCase()}</label>
                  <input type="number" min="1" max="100" step="1" class="form-control rounded-1" name="${subjectName}-mark" id="${subjectName}-mark" placeholder="mark received.." required>
              </div>`;
      inputDiv2.append(newHTML2);
    }
  });
}


$(document).ready(function () {
  // function when you submit the form
  $('.demo-form').submit(function (event) {
    event.preventDefault();

    let subjectTitle = $('#subject-title');
    // subjectTitle.empty();

    // each input element inisde the div this function will gather the subjects grade and mark %
    $('#input-div-2 input').each(function () {
      let subjectName = $(this).prev('label').text();
      let mark = parseInt($(this).val());
      let grade = grade4u(mark);

      // render results into the html
      let resultHTML = `${subjectName.toUpperCase()} ${mark}%:<br><br><p style='color: white;'> Grade: '${grade.toUpperCase()}'</p><br>`;
      subjectTitle.append(resultHTML);
    });
    //show the results card
    $('.card').removeAttr('hidden');
  });
});

// calculate the correct grades 
function grade4u(mark) {
  if (mark >= 90) {
    return "A";
  } else if (mark >= 80) {
    return "B";
  } else if (mark >= 70) {
    return "C";
  } else if (mark >= 60) {
    return "D";
  } else if (mark >= 50) {
    return "E";
  } else {
    return "F";
  }
}

// parsley.js form navigation
$(function () {
  var $sections = $('.form-section');

  function navigateTo(index) {
    // Mark the current section with the class 'current'
    $sections
      .removeClass('current')
      .eq(index)
      .addClass('current');
    // Show only the navigation buttons that make sense for the current section:
    $('.form-navigation .previous').toggle(index > 0);
    var atTheEnd = index >= $sections.length - 1;
    $('.form-navigation .next').toggle(!atTheEnd);
    $('.form-navigation [type=submit]').toggle(atTheEnd);
  }

  function curIndex() {
    // Return the current index by looking at which section has the class 'current'
    return $sections.index($sections.filter('.current'));
  }

  // Previous button is easy, just go back
  $('.form-navigation .previous').click(function () {
    navigateTo(curIndex() - 1);
  });

  // Next button goes forward iff current block validates
  $('.form-navigation .next').click(function () {
    $('.demo-form').parsley().whenValidate({
      group: 'block-' + curIndex()
    }).done(function () {
      navigateTo(curIndex() + 1);
    });
  });

  // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
  $sections.each(function (index, section) {
    $(section).find(':input').attr('data-parsley-group', 'block-' + index);
  });
  navigateTo(0); // Start at the beginning
});

