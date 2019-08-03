$(function () {
    // let moveVal = '';
    // let movecontent = '';

    // $('.list-content').draggable({
    //     containment: "#main",
    //     revert: true,
    //     revertDuration: 1,
    //     scroll: true,
    //     stop: function (event, ui) {
    //         moveVal = $(this)[0].attributes[1].value;
    //         movecontent = $(this).text();
    //     }
    // });

    // $('.list').droppable({
    //     accept: '.list-content',
    //     drop: function (e, ui) {
    //         let self = $(this);

    //         let before_change_attr = $(ui)[0].helper[0].classList[1]; //移動前属性
    //         let after_change_attr = self.children("p")[0].classList[1]; //移動後属性
    //         // 移動ごと移動前の場所が同じなら変更しない
    //         if (before_change_attr == after_change_attr) {
    //             return;
    //         }

    //         $(ui.helper[0]).css({
    //             'display': 'none'
    //         });
    //         $(ui.helper[0]).prev('input').css({
    //             'display': 'none'
    //         });
    //         setTimeout(function () {
    //             self.parent().append(`<input class="list-checkbox" type="checkbox" value=${moveVal}><p class="list-content" value=${moveVal}>${movecontent}</p>`);
    //         }, 200);

    //         $.ajax({
    //             url: '/main/change',
    //             type: 'POST',
    //             data: {
    //                 'id': $(ui)[0].helper[0].attributes[1].value,
    //                 'attr': after_change_attr
    //             }
    //         })
    //             .done(data => {
    //                 console.log(data);
    //             })
    //             .fail(data => {
    //                 console.log(data);
    //             })
    //             .always(data => {

    //             });
    //     }
    // });

    $(document).on('click', '.list-checkbox', function () {
        let self = $(this);
        setTimeout(function () {
            self.css({
                'display': 'none'
            });
            self.next('p').css({
                'display': 'none'
            });
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

    $(document).on('click', '#must', function () {
        $('.must').css({
            'display': 'inline'
        });
        $('.want').css({
            'display': 'none'
        });
        $('.eventually').css({
            'display': 'none'
        });
    });

    $(document).on('click', '#want', function () {
        $('.must').css({
            'display': 'none'
        });
        $('.want').css({
            'display': 'inline'
        });
        $('.eventually').css({
            'display': 'none'
        });
    });

    $(document).on('click', '#eventually', function () {
        $('.must').css({
            'display': 'none'
        });
        $('.want').css({
            'display': 'none'
        });
        $('.eventually').css({
            'display': 'inline'
        });
    });

    $(document).on('click', '#all', function () {
        $('.must').css({
            'display': 'inline'
        });
        $('.want').css({
            'display': 'inline'
        });
        $('.eventually').css({
            'display': 'inline'
        });
    });
});

