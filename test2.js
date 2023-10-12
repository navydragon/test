  students_semester = XQuery("sql: SELECT SC.[user], C.fullname FROM cc_ych_semester_collaborators SC INNER JOIN collaborators C ON SC.[user]=C.id WHERE ych_semester = '"+semester_id+"'");
  for (student in students_semester) {
    student_doc = tools.open_doc(student.user);
    is_sub = student_doc.TopElem.custom_elems.ObtainChildByKey("perevod").value == 'true' && Int(student_doc.TopElem.custom_elems.ObtainChildByKey("perevod_sem_num").value) > Int(semester_doc.semestr);
    //is_sub = true;
    is_och = student_doc.TopElem.custom_elems.ObtainChildByKey("is_och").value == 'true'
    if (StrCharCount(student_doc.TopElem.custom_elems.ObtainChildByKey("diss_from_gr_id").value) == 0) {
      result.students.push({
        'id':String(student.user),
        'fullname': student.fullname,
        'is_sub': is_sub,
        'is_och': is_och,
        'avatar': StrCharCount(student_doc.TopElem.pict_url) > 0 ? 'https://api.emiit.ru/' + student_doc.TopElem.pict_url : '',
      });
    }
  }
