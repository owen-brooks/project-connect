var fs = require("fs");
function mergeValues(values,content){
    for(var key in values){
        content = content.replace("{{"+key+"}}",values[key]);
    }
    return content;
}

function view(templateName, values, res){
    /**
     *  Purpose:
     *      fill in an HTML template w/ user data
     *  Use:
     *      just pass the template, json data and the reponse
     *      variables in the html template should be surrounded by double brackets
     *      ie: {{title}}
     */

    console.log(values);
    var fileContent = fs.readFileSync('src/views/'+templateName+'.html','utf8');
    fileContent = mergeValues(values, fileContent);
    res.write(fileContent);
}

module.exports.view = view;