var fs = require("fs");
var navbar = fs.readFileSync('src/templates/navbar.temp','utf8');
var header = fs.readFileSync('src/templates/header.html','utf8');

function mergeValues(values,content){
    // scripts and what not needed in the header for the navbar to work
    content = content.replace("{{header}}",header);
    // add navbar to each template
    content = content.replace("{{navbar}}",navbar);
    for(var key in values){
        content = content.replace(new RegExp("{{"+key+"}}", "g"),values[key]);
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
    var fileContent = fs.readFileSync('src/templates/'+templateName+'.temp','utf8');
    fileContent = mergeValues(values, fileContent);
    res.write(fileContent);
    res.end();
}

module.exports.view = view;