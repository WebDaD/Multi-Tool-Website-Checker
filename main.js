/* global $, checks */
$(document).ready(function () {
  $('#go').click(function () {
    var url = prefix($('#url').val())

    checks.forEach(check => {
      prepElement(check)
      getResult(url, check)
    })
  })
})
function prepElement (settings) {
  if ($('#' + settings.name).length) {
    // element exists, do nothing
  } else {
    var row = '<tr id="' + settings.name + '">'
    row += '<td>' + settings.niceName + '</td>'
    row += '<td class="result"></td>'
    row += '<td class="link"><a href="" target="_blank" style="display:none;">Link</a></td>'
    row += '<td class="icon"></td>'
    row += '</tr>'
    $('#results').append(row)
  }
}
function getResult (url, settings) {
  $('#' + settings.name + ' .result').html('<i class="fa fa-cog fa-spin"></i>')
  $('#' + settings.name + ' .link a').hide()
  $('#' + settings.name + ' .icon').hide()
  if (settings.quickRequest && settings.quickRequest.url) {
    settings.quickRequest.url = settings.quickRequest.url.replace('[URL]', url)
  }
  $.ajax({
    type: settings.quickMethod || 'GET',
    url: settings.quickURL.replace('[URL]', url),
    data: settings.quickRequest || null,
    success: function (data) {
      var score = 'undefined'
      switch (settings.quickType) {
        case 'JSON':
          score = resolve(settings.quickElement, data)
          break
        case 'SINGLE':
          score = $(settings.quickElement, $(data))[0].html()
          break
        case 'LIST':
          score = $(settings.quickElement, $(data)).length
          break
      }

      $('#' + settings.name + ' .result').html(score + ((settings.maxScore) ? ' / ' + settings.maxScore : ''))
      $('#' + settings.name + ' .link a').attr('href', ((settings.detailsURL) ? settings.detailsURL.replace('[URL]', url) : settings.quickURL.replace('[URL]', url)))
      $('#' + settings.name + ' .link a').show()
      iconScore('#' + settings.name + ' .icon', score, settings.critical, settings.warning, settings.invert, settings.noIntScore)
    }
  })
}

function iconScore (element, score, critical, warning, invert, noIntScore) {
  if (noIntScore) {
    if (score === critical) {
      setIcon(element, 'fire', '#ff0000')
    } else if (score === warning) {
      setIcon(element, 'exclamation-triangle', '#cc9900')
    } else {
      setIcon(element, 'check', '#00cc00')
    }
  } else {
    if (invert) {
      if (score > critical) {
        setIcon(element, 'fire', '#ff0000')
      } else if (score > warning) {
        setIcon(element, 'exclamation-triangle', '#cc9900')
      } else {
        setIcon(element, 'check', '#00cc00')
      }
    } else {
      if (score > warning) {
        setIcon(element, 'check', '#00cc00')
      } else if (score > critical) {
        setIcon(element, 'exclamation-triangle', '#cc9900')
      } else {
        setIcon(element, 'fire', '#ff0000')
      }
    }
  }

  $(element).show()
}
function setIcon (element, icon, color) {
  $(element).html('<i class="fa fa-' + icon + '" style="color:' + color + ';"></i>')
}
function prefix (url) {
  var prefix = 'http://'
  if (url.substr(0, prefix.length) !== prefix) {
    url = prefix + url
  }
  return url
}
function resolve (path, obj) {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : null
  }, obj)
}
