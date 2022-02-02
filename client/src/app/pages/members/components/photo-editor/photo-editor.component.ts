import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from "ngx-file-drop";
import { MemberModel } from "../../../../shared/models/member.model";
import { NotificationService } from "../../../../shared/services/notification.service";
import { MembersService } from "../../services/members.service";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  uploadingPhotoUrl: any = null
  @Input() member: MemberModel | null = null
  private image: File | null = null;

  constructor(private notificationService: NotificationService, private memberService: MembersService) {
  }

  ngOnInit(): void {
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        // Here you can access the real file
        if (!this.isValidImage(file)) return;

        // Only Single Upload
        this.files = files

        this.displayPhotoToUpload(file)
      });
    }
  }

  private isValidImage(file: File): boolean {
    if (file.type.match(/image\/*/) == null) {
      this.notificationService.error("Only images are supported")
      return false;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.notificationService.error("Image can't be greater than 2 mb")
      return false;
    }

    return true;
  }

  onRemoveUploadItem() {
    this.files = []
  }

  onUploadItem() {
    if (this.image && this.member) {
      this.memberService.uploadPhoto(this.image, this.member.username).subscribe(
        res => {
          if (this.member) {
            this.onRemoveUploadItem()
            this.member.photos.push(res)
          }
        }
      )
    }
  }

  private displayPhotoToUpload(file: File) {
    const reader = new FileReader();
    this.image = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.uploadingPhotoUrl = reader.result;
    }
  }
}
