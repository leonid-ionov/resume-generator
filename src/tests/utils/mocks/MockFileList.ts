export default class MockFileList {
  private readonly files: Record<number, File>;
  constructor(fileCount = 0) {
    this.files = {};
    for (let i = 0; i < fileCount; i += 1) {
      const blob = new Blob([`mock content`], { type: 'text/plain' });
      this.files[i] = new File([blob], `mockFile${i}.txt`, { type: 'text/plain' });
    }
  }
  get list(): FileList {
    return {
      ...this.files,
      length: Object.keys(this.files).length,
      item: (index: number): File | null => this.files[index] || null,
      *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i += 1) {
          const file = this.item(i);
          if (file) yield file;
        }
      },
    };
  }
}
