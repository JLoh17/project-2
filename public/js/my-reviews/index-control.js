const setModal = function(html) {
  const $modal = $('#modal')
  const $modalContent = $modal.find('.modal-content')

  $modal.modal('show')
  $modalContent.html(html)
}

const setLoadingModal = function() {
  setModal(`
    <div class="modal-header">
      <h5 class="modal-title">Loading</h5>
      <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
    </div>
    <div class="modal-body">
      <div class="text-center">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  `)
}

const errorHandler = function(err, $elem) {
  switch(err.response.status) {
    case 406: {
      $elem.attr('disabled', false) // disable button

      const { response: { data: { errors } }} = err

      $('#modal').find('.invalid-feedback').empty()
      $('#modal').find('.is-invalid').removeClass('is-invalid')

      errors.forEach(function(error) {
        const { param: fieldName, msg } = error
        const $input = $('#modal').find(`[data-error-ref="${fieldName}"]`)
        const $invalidFeedback = $input.siblings('.invalid-feedback')

        $input.addClass('is-invalid')
        $invalidFeedback.text(msg)
      })
      break
    }
    case 401: {
      alert(err.response.data.message)
      window.location.href = '/'
      break
    }
    case 404: {
      alert(err.response.data.message)
      break
    }
    default: {
      console.log(err)
    }
  }
}

// Show modal for new, edit and show button
$('#my-reviews-list, #modal').on('click', '.show-btn, .edit-btn, #new-btn', function(e) {
  e.preventDefault()
  const parent = $(e.target).parent('button')[0]
  const $elem = parent ? $(e.target).parent() : $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')

  setLoadingModal()

  axios({ method, url }).then(function(resp) {
    setModal(resp.data)
  }).catch(errorHandler)
})

// Delete button for list and delete button inside modal
$('#my-reviews-list, #modal').on('click', '.delete-btn', function(e) {
  e.preventDefault()
  const parent = $(e.target).parent('button')[0]
  const $elem = parent ? $(e.target).parent() : $(e.target)
  const url = $elem.data('url')

  $('#my-reviews-list .delete-btn, #modal').attr('disabled', true) // disable button to not submit twice, then we send an AJAX request below to hide the modal, then delete the entire row of which we targeted

  axios({ method: 'DELETE', url }).then(function() {
    $('#modal').modal('hide')
    $(`#my-reviews-list .delete-btn[data-method="DELETE"]`).parentsUntil('#reviews-list').remove() // links to views/pages/my-reviews/index.ejs

    window.location.reload()

  }).catch(errorHandler).then(function() {
    $('#my-reviews-list .delete-btn, #modal').attr('disabled', false)
  })
})

// Submit form on modal
$('#modal').on('click', '#reviews-form-submit , #update-form-submit', function(e) {
  e.preventDefault()
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  const formData = new FormData($('#modal form')[0])

  $elem.attr('disabled', true)

  axios({ method, url, data: formData }).then(function(resp) {
    setModal(resp.data)

    if (method === 'POST') { // this makes sure a newly created item is shown as first
      const id = $('#modal').find('.modal-title span').text()
      const title = $('#modal').find('.modal-body h1').text()
      if (id) {
        $('#reviews-list').prepend(`
          <li class="my-1">
            <a class="show-btn font-weight-bold" data-url="/api/my/reviews/${id}" data-method="GET">${title}</a>
            <button class="edit-btn btn btn-info btn-sm" data-url="/api/my/reviews/${id}/edit" data-method="GET"><i class="fas fa-edit"></i></button>
            <button class="delete-btn btn btn-danger btn-sm" data-url="/api/my/reviews/${id}" data-method="DELETE"><i class="fas fa-trash"></i></button>
          </li>
        `)
      }
    }window.location.reload()
  }).catch((err) => errorHandler(err, $elem))
})
