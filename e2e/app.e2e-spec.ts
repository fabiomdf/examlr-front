import { ExamlrFrontPage } from './app.po';

describe('examlr-front App', () => {
  let page: ExamlrFrontPage;

  beforeEach(() => {
    page = new ExamlrFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
