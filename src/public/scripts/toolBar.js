class ToolBar{

    $toolbar = null;

    constructor(toolbar){
        this.$toolbar = toolbar
        this.#init();
    };

    #init(){
        this.#navBarLinkClickedHandler();
    };

    #navBarLinkClickedHandler(){

        let _this = this;
        $('.link').mouseenter(function(e){

            _this.#onNavBarLinkClicked($(this));
        });

        $('.drop-down').mouseleave(function(){

            _this.#hideMenus();
        });
    };

    #showMenu($menu){

        if(!$menu.hasClass('hidden'))
        {
            $menu.addClass('hidden');
                
            if($menu.hasClass('fadein'))
            {
                $menu.removeClass('fadein');
            }
        }
        else
        {
            this.#hideMenus();

            window.setTimeout(function(){
                $menu.removeClass('hidden');
            },0);
            
            window.setTimeout(function(){
                $menu.addClass('fadein');
            },50);
        }

        window.clearTimeout(50);
    };

    #hideMenus(){

        $(".drop-down").removeClass('fadein');
            
        window.setTimeout(function(){
            $(".drop-down").addClass('hidden');
        },0);

        window.clearTimeout(0);

    };

    #onNavBarLinkClicked($link){

        let action = $link.data("action");

        if(!this.navBarLinkClicked(action))
        {
            if(action == "menu")
            {
                this.#showMenu($link.siblings('.drop-down'));
            }
            else
            {
                this.#hideMenus();
            }
        }
        
    };

    navBarLinkClicked(action){
        return false;
    };
}