import { Component } from '@angular/core';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { PopularTagsComponent } from '../../../shared/components/popularTags/popularTags.component';
import { FeedTogglerComponent } from '../../../shared/components/feedToggler/feedToggler.component';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent],
  templateUrl: './globalFeed.component.html',
})
export class GlobalFeedComponent {
  apiUrl = '/articles'
}
