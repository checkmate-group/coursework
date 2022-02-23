function utils()
{
    const toolBar = new ToolBar($('#toolBar'));
    const searchTool = new SearchTool($('#searchtool'));
    const $languages = document.querySelectorAll('#language');

    this.start = function(){

        toolBar.navBarLinkClicked = navBarLinkClicked;
        searchTool.searchSettingClicked = searchSettingClicked;

        function navBarLinkClicked(action){
            //empty for now
        }

        function searchSettingClicked(action){
            
        };

        initLanguagePercentage($languages);
    };

    function initLanguagePercentage($languages){

        let percentageElm = null;
        let populationVal = null;

        $($languages).each((index,element)=>{

            percentageElm = $(element).siblings('#percentage');
            populationVal = parseInt($(element).siblings('#population').data('value'));

            percentageElm.text((populationVal / 6078749450)*100 + " %");
        });
    }
};

const setup = () =>{

    try
    {
        $(document).ready(function(){

            window.app = new utils();
            window.app.start();

        });

    }catch(e)
    {
        alert("conection errors occured !");
    }
};

setup();