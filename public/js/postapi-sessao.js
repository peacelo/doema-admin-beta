function buscaCandidato(valor) {
    document.getElementById("overlay").style.display = "block";
    var size = $("#size").val();
    postApi({ "page": 0, "busca": valor, "size": size }, 0, 0);
}

function mudaSize() {
    document.getElementById("overlay").style.display = "block";
    var page = $(this).attr('data-page');
    var busca = $("#busca").val();
    var size = $("#size").val();
    var data;
    if (busca != null) {
        data = { page: page, busca: busca, size: size };
    } else {
        data = { page: page, size: size };
    }
    postApi({ "page": 0, "busca": busca, "size": size }, 0, 0);
}
function postApiPosterior(data, page, pageAnterior, pagina) {
    document.getElementById("overlay").style.display = "block";
    $.post('list', data).done(function (response) {
        var tr = "";
        
        response.itens.forEach(function (data) {
            var ativo = data.status == true ? 'Ativa' : 'Inativa';
            var background = "";
            tr += '<tr>' +
                '<td>' + data.servico + '</td>' +
                '<td>' + data.sessao + '</td>' +
                '<td>' + data.horaInicio + ' - ' + data.horaFim + '</td>' +
                '<td>' + data.vagasRestantes + '</td>' +
                '<td>'+ ativo + '</td>' +
                '<td>' +
                '<a title="Editar" href="/app/servico/'+data.servicoId+'/sessao/edit/' + data.id + '"' +
                '<i class="material-icons" style="color: orange;">edit</i>' + '</a> ' +
                '<a href="/app/crianca-sessao/list/'+ data.id +'" data-toggle="modal" data-toggle-alt="tooltip" data-placement="bottom" title="" data-original-title="Agendamentos da Sessão">' +
                '<i class="material-icons" style="color: green;">assignment</i>'+
                '</a>' +
                '<a href="#" data-toggle="modal"' +
                'data-target="#logoutModal"' +
                'onclick="setaDadosModal("' + data.id + '")">' +
                '<i class="material-icons" style="color: red;">delete</i></a>' +
                '</td>' +
                '</tr>';
        });
        document.getElementById("overlay").style.display = "none";
        $('#table_body').html(tr);
        var number = response.number + 1;
        var tpages = response.totalPages;
        var pagenumber = number + ' de ' + tpages;
        $('#page-number').html(pagenumber);

        if (number < response.totalPages) {
            $("#page-posterior").attr('data-page', parseInt(response.number) + 1);
            $("#page-anterior").attr('data-page', parseInt(pageAnterior) + 1).removeClass('disabled');
        } else {
            $("#page-anterior").attr('data-page', parseInt(pageAnterior) + 1).removeClass('disabled');
            $("#page-posterior").addClass('disabled');
        }

    })
}

function postApiAnterior(data, pageAnterior, pagePosterior, pagina) {
    document.getElementById("overlay").style.display = "block";
    $.post('list', data).done(function (response) {

        var tr = "";
        
        response.itens.forEach(function (data) {
            var ativo = data.status == true ? 'Ativa' : 'Inativa';
            var background = "";
            tr += '<tr>' +
                '<td>' + data.servico + '</td>' +
                '<td>' + data.sessao + '</td>' +
                '<td>' + data.horaInicio + ' - ' + data.horaFim + '</td>' +
                '<td>' + data.vagasRestantes + '</td>' +
                '<td>'+ ativo +'</td>' +
                '<td>' +
                '<a title="Editar" href="/app/servico/'+data.servicoId+'/sessao/edit/' + data.id + '"' +
                '<i class="material-icons" style="color: orange;">edit</i>' + '</a> ' +
                '<a href="/app/crianca-sessao/list/'+ data.id +'" data-toggle="modal" data-toggle-alt="tooltip" data-placement="bottom" title="" data-original-title="Agendamentos da Sessão">' +
                '<i class="material-icons" style="color: green;">assignment</i>'+
                '</a>' +
                '<a href="#" data-toggle="modal"' +
                'data-target="#logoutModal"' +
                'onclick="setaDadosModal("' + data.id + '")">' +
                '<i class="material-icons" style="color: red;">delete</i></a>' +
                '</td>' +
                '</tr>';
        });
        document.getElementById("overlay").style.display = "none";
        $('#table_body').html(tr);
        var tpages = response.totalPages;
        var pagenumber = pageAnterior + ' de ' + tpages;
        $('#page-number').html(pagenumber);

        $("#page-posterior").removeClass('disabled');

        if (pageAnterior == 1) {
            $("#page-anterior").attr('data-page', parseInt(pageAnterior) - 1).addClass('disabled');
            $("#page-link-anterior").addClass('disabled');
        } else {
            $("#page-anterior").attr('data-page', parseInt(pageAnterior) - 1);
        }
        if (pagePosterior != 1) {
            $("#page-posterior").attr('data-page', parseInt(pagePosterior) - 1);
        }
        

    });
}

function postApi(json, page, pageAnterior, pagina) {
    document.getElementById("overlay").style.display = "block";
    $.post('list', json).done(function (response) {
        var tr = "";
        
        response.itens.forEach(function (data) {
            var ativo = data.status == true ? 'Ativa' : 'Inativa';
            var background = "";
            tr += '<tr>' +
                '<td>' + data.servico + '</td>' +
                '<td>' + data.sessao + '</td>' +
                '<td>' + data.horaInicio + ' - ' + data.horaFim + '</td>' +
                '<td>' + data.vagasRestantes + '</td>' +
                '<td>'+ ativo +'</td>' +
                '<td>' +
                '<a title="Editar" href="/app/servico/'+data.servicoId+'/sessao/edit/' + data.id + '"' +
                '<i class="material-icons" style="color: orange;">edit</i>' + '</a> ' +
                '<a href="/app/crianca-sessao/list/'+ data.id +'" data-toggle="modal" data-toggle-alt="tooltip" data-placement="bottom" title="" data-original-title="Agendamentos da Sessão">' +
                '<i class="material-icons" style="color: green;">assignment</i>'+
                '</a>' +
                '<a href="#" data-toggle="modal"' +
                'data-target="#logoutModal"' +
                'onclick="setaDadosModal("' + data.id + '")">' +
                '<i class="material-icons" style="color: red;">delete</i></a>' +
                '</td>' +
                '</tr>';
        });
        document.getElementById("overlay").style.display = "none";
        $('#table_body').html(tr);
        var number = response.number + 1;
        var tpages = response.totalPages;
        var pagenumber = number + ' de ' + tpages;
        $('#page-number').html(pagenumber);
        $("#page-anterior").addClass('disabled');

        if (number == response.totalPages) {
            $("#page-posterior").attr('data-page', 0);
            $("#page-posterior").addClass('disabled');
        } else {
            $("#page-posterior").attr('data-page', parseInt(response.number) + 1);
            $("#page-posterior").removeClass('disabled');
        }

    })
}
