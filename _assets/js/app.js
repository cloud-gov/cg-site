// Add your custom javascript here
console.log("Hi from Federalist");

mermaid.initialize({startOnLoad:true, theme: 'null'}, ".someOtherClass");

var sideNavParents = document.querySelectorAll(".usa-sidenav__item--parent-item");
var subLists = document.querySelectorAll("ul.usa-sidenav__sublist");


function openCurrentSubNav(self){
    //Toggle the attribute
    self.setAttribute('aria-expanded', !self.getAttribute('aria-expanded'));
    self.classList.toggle('usa-current');
    var ariaHandled = self.getAttribute('aria-controls');

    //toggle the subnav
    var controlledElement = document.getElementById(ariaHandled);
    controlledElement.setAttribute('aria-hidden', !controlledElement.getAttribute('aria-hidden'));
    controlledElement.classList.toggle('display-none');
}

function closeAllLists(listArrary) {
    listArrary.forEach(element => {
        element.setAttribute('aria-hidden', true);
        element.classList.add('display-none');
    });
}

function removeAllUSACurrent (listArrary){
    listArrary.forEach(element => {
        element.classList.remove('usa-current');
    });
}

var sideNavExpansion = function(event){
    event.preventDefault();
    //Close all subnavs
    if (!this.classList.contains('usa-sidenav__sublist--middle-generation')){
        closeAllLists(subLists);
        removeAllUSACurrent(sideNavParents);
    }


    openCurrentSubNav(this);
};

for (var i = 0; i < sideNavParents.length; i++) {
    sideNavParents[i].addEventListener('click', sideNavExpansion, false);
}