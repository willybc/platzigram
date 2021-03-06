/**
 * Module dependencies
 */

require("babel-core/register");
require("babel-polyfill");

import page from 'page';
import template from './template';
import title from 'title';
import empty from 'empty-element';
import header from '../header';

page('/:username', loadUser, header, function (ctx, next) {
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.user.username}`);
  empty(main).appendChild(template(ctx.user));
  $('.modal.trigger').learnModal();
});

page('/:username/:id', loadUser, header, function (ctx, next) {
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.user.username}`);
  empty(main).appendChild(template(ctx.user));
  $(`#modal${ctx.params.id}`).openModal({
    complete: function () {
      page(`/${ctx.params.username}`)
    }
  });
});


async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
    next();
  } catch (err) {
    console.log(err);
  }
}