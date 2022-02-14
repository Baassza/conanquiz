$("#play").click(function(){
    window.location = "game.html"
})
$("#author").click(function(){
    Swal.fire({
        title: 'ผู้จัดทำ',
        text: 'นายวรพล ทั่งศิริ   สาขาวิศวกรรมคอมพิวเตอร์   คณะครุศาสตร์อุตสาหกรรม      มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี',
    })
})
$("#play").on('press', function(e) {
    Swal.fire({
        title: 'คุณต้องการเริ่มใหม่หรือไม่?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'ใช่',
        denyButtonText: 'ไม่ใช่',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.clear()
        } 
      })
  });