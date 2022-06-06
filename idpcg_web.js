//Author: Zi Hao (Nemo) Liu, @menoliu
//Date modified: May 26, 2022

function formReset() {
    document.getElementById("idpcg_form").reset();
    document.getElementById("preview").innerHTML = "#!/bin/bash<br><br>idpconfgen -h \\";
}

function resetScm() {
    document.getElementById("faspr").checked=false;
    document.getElementById("mcsce").checked=false;
}

function resetDsd() {
    document.getElementById("dsd").checked=false;
}

function processForm(newline) {
    var formData = new FormData(document.getElementById("idpcg_form"));
    var contents = '';
    var select = document.getElementById("subclients");
    var client = select.options[select.selectedIndex].value;
    
    for (var pair of formData.entries()){
        var flag = pair[0];
        var val = pair[1];

        if (flag == "pos" && val != '') {
            contents += newline+val+' \\';
            continue;
        }

        if (val != ''){
            if (val == "True"){
                contents += newline+flag+' \\';
            }
            else {
                contents += newline+flag+' '+val+' \\';
            }
        }
    }

    contents=contents.slice(0,-2);
    return [client, contents];
}

function loadPreview() {
    var nltab = "<br>&nbsp;&nbsp;&nbsp;&nbsp;";
    processed = processForm(nltab);

    var header = "#!/bin/bash<br><br>idpconfgen "+processed[0]+" \\";
    document.getElementById("preview").innerHTML = header+processed[1];
}

function downloadScript() {
    var nltab = "\n\t";
    processed = processForm(nltab)

    var header = "#!/bin/bash\n\nidpconfgen "+processed[0]+" \\";
    var bashFile = new File([header+processed[1]], "idpconfgenJob.sh", {type: "text/plain;charset=utf-8"});
    saveAs(bashFile);
}