// jqueryが外部ファイルで読み込まれないため仕方なし
$(function () {
    let moveVal = '';
    let movecontent = '';

    $('.list-content').draggable({
        containment: "#main",
        revert: true,
        revertDuration: 1,
        stop: function (event, ui) {
            moveVal = $(this)[0].attributes[1].value;
            movecontent = $(this).text();
        }
    });

    $('.list').droppable({
        accept: '.list-content',
        drop: function (e, ui) {
            $(ui.helper[0]).css({ 'display': 'none' });
            $(ui.helper[0]).prev('input').css({ 'display': 'none' });
            let self = $(this);
            let attr = self.children("p")[0].classList[1];
            setTimeout(function () {
                self.parent().append(`<input class="list-checkbox" type="checkbox" value=${moveVal}><p class="list-content" value=${moveVal}>${movecontent}</p>`);
            }, 200);

            $.ajax({
                url: '/main/change',
                type: 'POST',
                data: {
                    'id': $(ui)[0].helper[0].attributes[1].value,
                    'attr': attr
                }
            })
                .done(data => {
                    console.log(data);
                })
                .fail(data => {
                    console.log(data);
                })
                .always(data => {

                });
        }
    });

    $(document).on('click', '.list-checkbox', function () {
        let self = $(this);
        setTimeout(function () {
            self.css({ 'display': 'none' });
            self.next('p').css({ 'display': 'none' });
            $.ajax({
                url: '/main/end',
                type: 'POST',
                data: {
                    'id': self.val()
                }
            })
                .done(data => {
                    console.log(data);
                })
                .fail(data => {
                    console.log(data);
                })
                .always(data => {

                });
        }, 1000);
    });
});