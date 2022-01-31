import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from "@kolkov/ngx-gallery";
import { ActivatedRoute } from "@angular/router";
import { MembersService } from "../../services/members.service";
import { MemberModel } from "../../../../shared/models/member.model";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  member: MemberModel | null = null
  galleryOptions: NgxGalleryOptions[] = []
  galleryImages: NgxGalleryImage[] = []

  constructor(private memberService: MembersService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls: NgxGalleryImage[] = [];
    if (!this.member) return imageUrls
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  private loadMember() {
    let username = this.route.snapshot.paramMap.get('username') || ""
    this.memberService.getMember(username).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    })
  }

}
