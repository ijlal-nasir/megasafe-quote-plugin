jQuery(document).ready(function () {
  var current_product_page_id = jQuery("#msatq_addtoquote_button")
    .find("#msatq_addtoquote")
    .attr("data-product-id");
  var added_products = localStorage.getItem("added_addtoquote_products");
  if (typeof current_product_page_id != "undefined") {
    if (added_products != null) {
      added_products = JSON.parse(added_products);
      for (var i = 0; i < added_products.length; i++) {
        if (added_products[i].includes(current_product_page_id)) {
          jQuery("#msatq_addtoquote_button").html(
            '<p>This product is already in your quotes list. <a href="" data-bs-toggle="modal" data-bs-target="#msatq_addtoquote_modal">Click Here</a> to see your quotes</p>'
          );
          break;
        }
      }
    }
  }
  var added_products = localStorage.getItem("added_addtoquote_products");
  if (added_products != null) {
    jQuery("#modal-quote-list-row").removeClass("elementdisplaynone");
    jQuery(".no-quote-in-list").addClass("elementdisplaynone");
    added_products = JSON.parse(added_products);
    let addtoquote_list =
      '<table id="msatq_quote_table" class="table"><thead><tr><th></th><th>Image</th><th>Product</th><th class="qty_head">Qty</th></tr></thead><tbody>';
    for (var list = 0; list < added_products.length; list++) {
      addtoquote_list +=
        '<tr class="not-border"><td><svg class="msatq_delete_quote" id="' +
        added_products[list][0] +
        '" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></td><td><img class="msatq_quoted_pro_img" src="' +
        added_products[list][2] +
        '"></td><td><a href="' +
        added_products[list][4] +
        '" class="mstq_product_title">' +
        added_products[list][1] +
        '</a></td><td><input type="number" class="mstq_qunatity" id="' +
        added_products[list][0] +
        '" value="' +
        added_products[list][3] +
        '"></td></tr><tr class="border-located"></tr>';
    }
    addtoquote_list += "</tbody></table>";
    jQuery("#quotes_added_product_list").html(addtoquote_list);
    jQuery(".quote-item-count").html(added_products.length);
  }
  jQuery("body").on("click", "#msatq_addtoquote", function () {
    var added_products = localStorage.getItem("added_addtoquote_products");
    jQuery("#modal-quote-list-row").removeClass("elementdisplaynone");
    jQuery(".no-quote-in-list").addClass("elementdisplaynone");
    jQuery("#msatq_message_after_submission").addClass("elementdisplaynone");
    var width = screen.width;
    let current_product_id = jQuery(this).attr("data-product-id");
    let product_title = jQuery(".postid-" + current_product_id + "")
      .find(".product_title")
      .text();
    let product_quantity = jQuery(".postid-" + current_product_id + "")
      .find(".qty")
      .val();
    var imgsrc = "";
    let product_link = location.href;
    jQuery(".wcgs-slider-image").each(function () {
      if (jQuery(this).attr("data-slick-index") == 0) {
        imgsrc = jQuery(this).attr("href");
      }
    });
    var addtoquote_modal_body = "";
    let added_addtoquote_products_array = [
      current_product_id,
      product_title,
      imgsrc,
      product_quantity,
      product_link,
    ];
    if (added_products == null) {
      added_products = [];
      added_products[0] = added_addtoquote_products_array;
      localStorage.setItem(
        "added_addtoquote_products",
        JSON.stringify(added_products)
      );
      jQuery("#msatq_addtoquote_button").html(
        '<p>Your Product is successfully added into the quote. <a href="" data-bs-toggle="modal" data-bs-target="#msatq_addtoquote_modal">Click Here</a> to see your quotes</p>'
      );
    } else {
      added_products = JSON.parse(added_products);
      added_products.push(added_addtoquote_products_array);
      localStorage.setItem(
        "added_addtoquote_products",
        JSON.stringify(added_products)
      );
      jQuery("#msatq_addtoquote_button").html(
        '<p>Your Product is successfully added into the quote. <a href="" data-bs-toggle="modal" data-bs-target="#msatq_addtoquote_modal" >Click Here</a> to see your quotes</p>'
      );
    }
    if (added_products.length > 0) {
      addtoquote_modal_body +=
        '<table id="msatq_quote_table" class="table"><thead><tr><th></th><th>Image</th><th>Product</th><th class="qty_head">Qty</th></tr></thead><tbody>';
      for (var added = 0; added < added_products.length; added++) {
        addtoquote_modal_body +=
          '<tr class="not-border"><td><svg class="msatq_delete_quote" id="' +
          added_products[added][0] +
          '" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></td><td><img class="msatq_quoted_pro_img" src="' +
          added_products[added][2] +
          '"></td><td><a href="' +
          added_products[added][4] +
          '" class="mstq_product_title">' +
          added_products[added][1] +
          '</a></td><td><input type="number" class="mstq_qunatity" id="' +
          added_products[added][0] +
          '" value="' +
          added_products[added][3] +
          '"></td></tr><tr class="border-located"></tr>';
      }
      addtoquote_modal_body += "</tbody></table>";
      jQuery("#quotes_added_product_list").html(addtoquote_modal_body);
      jQuery(".quote-item-count").html(added_products.length);
    }
  });

  jQuery("body").on("click", "#msatq_submit_your_request", function (e) {
    let ajax_url = window["origin"] + window["woocommerce_params"]["ajax_url"];
    let quotes_added_array = added_products;
    let first_name = jQuery("#msatq_firstname").val();
    let last_name = jQuery("#msatq_lastname").val();
    let email = jQuery("#msatq_email").val();
    let phone = jQuery("#msatq_phonenumber").val();
    let message = jQuery("#msatq_Message").val();
    if (first_name == "") {
      alert("Please enter first name");
    } else {
      if (last_name == "") {
        alert("Please enter last name");
      } else {
        if (email == "") {
          alert("Please enter email");
        } else {
          if (phone == "") {
            alert("Please enter phone number");
          }
        }
      }
    }
    if (first_name != "" && last_name != "" && email != "" && phone != "") {
      jQuery(this).css("cursor", "not-allowed");
      jQuery(this).css("width", "92%");
      jQuery(".spinnerloader").removeClass("elementdisplaynone");
      jQuery.ajax({
        type: "POST",
        url: ajax_url,
        data: {
          action: "msatq_request_quote_email",
          quotes_list: quotes_added_array,
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
          message: message,
        },
        success: function (data) {
          jQuery(this).css("cursor", "default");
          jQuery(".spinnerloader").addClass("elementdisplaynone");
          jQuery("#msatq_message_after_submission").removeClass(
            "elementdisplaynone"
          );
          jQuery("#modal-quote-list-row").addClass("elementdisplaynone");
          jQuery(".no-quote-in-list").addClass("elementdisplaynone");
          localStorage.removeItem("added_addtoquote_products");
          var current_product_id = jQuery(".single_add_to_cart_button").val();
          console.log(current_product_id);
          jQuery("#msatq_addtoquote_button").html(
            '<button id="msatq_addtoquote" data-product="add_to_quote_' +
              current_product_id +
              '" data-product-id = "' +
              current_product_id +
              '"type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#msatq_addtoquote_modal">Request A Quote</button>'
          );
          jQuery(".quote-item-count").html(0);
        },
      });
    }
  });

  jQuery("body").on("click", ".msatq_delete_quote", function (e) {
    let deleted_quote_id = jQuery(this).attr("id");
    var get_quote_list = localStorage.getItem("added_addtoquote_products");
    jQuery(this).parent().parent().remove();
    if (get_quote_list != null) {
      get_quote_list = JSON.parse(get_quote_list);
      for (var i = 0; i < get_quote_list.length; i++) {
        if (get_quote_list[i].includes(deleted_quote_id)) {
          if (jQuery("body").hasClass("postid-" + get_quote_list[i][0])) {
            jQuery("#msatq_addtoquote_button").html(
              '<button id="msatq_addtoquote" data-		product="add_to_quote_' +
                get_quote_list[i][0] +
                '" data-product-id = "' +
                get_quote_list[i][0] +
                '"type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#msatq_addtoquote_modal">Request A Quote</button>'
            );
          }
          get_quote_list.splice(i, 1);

          console.log(get_quote_list);
          if (get_quote_list.length > 0) {
            jQuery(".quote-item-count").html(get_quote_list.length);
            localStorage.setItem(
              "added_addtoquote_products",
              JSON.stringify(get_quote_list)
            );
          }
          if (get_quote_list.length == 0) {
            jQuery(".quote-item-count").html(0);
            localStorage.removeItem("added_addtoquote_products");
            jQuery("#modal-quote-list-row").addClass("elementdisplaynone");
            jQuery(".no-quote-in-list").removeClass("elementdisplaynone");
          }
        }
      }
    }
  });

  jQuery("body").on("change", ".mstq_qunatity", function (e) {
    let update_quantity_quote_id = jQuery(this).attr("id");
    var get_quote_list = localStorage.getItem("added_addtoquote_products");
    let updated_value = jQuery(this).val();
    if (get_quote_list != null) {
      get_quote_list = JSON.parse(get_quote_list);
      for (var i = 0; i < get_quote_list.length; i++) {
        if (get_quote_list[i].includes(update_quantity_quote_id)) {
          get_quote_list[i][3] = updated_value;
          localStorage.setItem(
            "added_addtoquote_products",
            JSON.stringify(get_quote_list)
          );
        }
      }
    }
  });
});
