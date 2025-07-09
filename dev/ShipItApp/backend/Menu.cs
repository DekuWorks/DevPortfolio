using Microsoft.AspNetCore.Components;

namespace ShipItApp.Components
{
    public class Menu : ComponentBase
    {
        [Parameter]
        public string ActiveItem { get; set; } = "Home";

        [Parameter]
        public EventCallback<string> OnItemSelected { get; set; }

        private List<MenuItem> menuItems = new()
        {
            new MenuItem { Id = "Home", Icon = "fas fa-home", Text = "Home" },
            new MenuItem { Id = "Tags", Icon = "fas fa-tags", Text = "Tags" },
            new MenuItem { Id = "Users", Icon = "fas fa-users", Text = "Users" },
            new MenuItem { Id = "Profile", Icon = "fas fa-user", Text = "Profile" },
            new MenuItem { Id = "YourPosts", Icon = "fas fa-file-alt", Text = "Your Posts" },
            new MenuItem { Id = "Settings", Icon = "fas fa-cog", Text = "Settings" }
        };

        private List<string> watchedTags = new()
        {
            "#React", "#Redux", "#TypeScript", "#ASP.NET"
        };

        protected async Task OnItemClick(string itemId)
        {
            ActiveItem = itemId;
            await OnItemSelected.InvokeAsync(itemId);
        }

        public class MenuItem
        {
            public string Id { get; set; } = string.Empty;
            public string Icon { get; set; } = string.Empty;
            public string Text { get; set; } = string.Empty;
        }
    }
} 