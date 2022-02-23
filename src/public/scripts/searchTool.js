class SearchTool{

    $searchTool = null;

    constructor(searchTool){
        this.$searchTool = searchTool;
        this.#init();
    };

    #init(){
        this.#searchSettingClickedHandler();
        this.#searchHandler();
    };

    #showSearchMenu($menu){

        if(!$menu.hasClass('hidden'))
        {
            $menu.addClass('hidden');

            if($menu.hasClass('fadebottom'))
            {
                $menu.removeClass('fadebottom');
            }

            $('table .rows').each(function (index, element) { 
                
                $(element).removeClass("hidden")
            });

            $('.table-head-title').each(function (index, element) { 
                
                $(this).removeClass('hidden');
                $(element).siblings('table').parent().removeClass('hidden');
            });
        }
        else
        {
            window.setTimeout(function(){
                $menu.removeClass('hidden');
            },0);

            window.setTimeout(function(){
                $menu.addClass('fadebottom');
            },100);
        }
    };

    #hideSearchMenu(){

        $('.search-drop-down').removeClass('fadebottom');
        $('.search-drop-down').addClass('hidden');
    };

    #searchSettingClickedHandler(){

        let _this = this;
        $('.search-setting').click(function(){

            _this.#onSearchSettingClicked($(this));
        });
    };

    #onSearchSettingClicked($btn){

        let action = $btn.data('action');

        if(!this.searchSettingClicked(action))
        { 
            if(action === "menu")
            {
                this.#showSearchMenu($btn.siblings('.search-drop-down'));
            }
            else
            {
                this.#hideSearchMenu();
            }
        }
    };

    #searchHandler(){

        let _this = this;

        $('#searchBtn').click(function(){

            _this.#onSearch($(this));
        });
    };

    #onSearch($searchBtn){

        let $menu = (($searchBtn.parent()).parent()).parent();
        let option = $menu.data("option");
        let nameVal = $('#name').val() || null;
        let nbreVal = $('#number').val();

        if(nameVal !== "")
        { 
            $('.table-head-title').each(function (index, element) { 
                    
                if($(this).text() != nameVal)
                {
                    $(this).addClass('hidden');
                    $(element).siblings('table').parent().addClass('hidden');
                }
            });

            if(nbreVal !== "")
            {
                   $('.table-container').each(function (index, element) { 
                        
                    if(!$(this).hasClass('hidden'))
                    {
                        $('table .rows',$(this)).each(function (index, element) { 
                                
                            if(index >= nbreVal)
                            {
                                $(element).addClass("hidden");
                            }
                        });
                    }
                });
            }
        }

        if(nameVal === null)
        {
            $('table .rows').each(function (index, element) { 
                
                if(index >= nbreVal)
                {
                    $(element).addClass("hidden");
                }
            });
        }
    };

    searchSettingClicked(action){
        return false;
    };

    searchingData(option,value){
        return false;
    }
};